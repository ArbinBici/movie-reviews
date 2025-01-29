from flask import request, jsonify
from models import get_db_connection, create_movies_table, create_reviews_table
import requests
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize database tables
create_movies_table()
create_reviews_table()

def init_routes(app):
    @app.route("/get_movies", methods=["GET"])
    def get_movies():
        """
        Get a list of all movies.
        ---
        responses:
          200:
            description: A list of movies.
            schema:
              type: array
              items:
                type: object
                properties:
                  id:
                    type: integer
                  title:
                    type: string
                  year:
                    type: integer
                  description:
                    type: string
                  poster_url:
                    type: string
        """
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM movies;")
        movies = cur.fetchall()
        conn.close()
        formatted_movies = [
            {"id": movie[0], "title": movie[1], "year": movie[2], "description": movie[3], "poster_url": movie[4]}
            for movie in movies
        ]
        return jsonify(formatted_movies)

    @app.route("/add_movie", methods=["POST"])
    def add_movie():
        """
        Add a new movie to the database.
        ---
        parameters:
          - name: body
            in: body
            required: true
            schema:
              type: object
              properties:
                title:
                  type: string
                year:
                  type: integer
                description:
                  type: string
                poster_url:
                  type: string
        responses:
          201:
            description: Movie added successfully.
          400:
            description: Invalid input.
        """
        data = request.get_json()
        title = data.get("title")
        year = data.get("year")
        description = data.get("description")
        poster_url = data.get("poster_url")

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
        INSERT INTO movies (title, year, description, poster_url)
        VALUES (%s, %s, %s, %s)
        """, (title, year, description, poster_url))
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Movie added successfully!"}), 201

    @app.route("/get_reviews", methods=["GET"])
    def get_reviews():
        """
        Get a list of all reviews.
        ---
        responses:
          200:
            description: A list of reviews.
            schema:
              type: array
              items:
                type: object
                properties:
                  id:
                    type: integer
                  movie_id:
                    type: integer
                  name:
                    type: string
                  email:
                    type: string
                  review:
                    type: string
                  rating:
                    type: integer
                  title:
                    type: string
        """
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT r.id, r.movie_id, r.name, r.email, r.review, r.rating, m.title FROM reviews r JOIN movies m ON r.movie_id = m.id;")
        reviews = cur.fetchall()
        conn.close()
        formatted_reviews = [
            {"id": review[0], "movie_id": review[1], "name": review[2], "email": review[3], "review": review[4], "rating": review[5], "title": review[6]}
            for review in reviews
        ]
        return jsonify(formatted_reviews)

    @app.route("/add_review", methods=["POST"])
    def add_review():
        """
        Add a new review for a movie.
        ---
        parameters:
          - name: body
            in: body
            required: true
            schema:
              type: object
              properties:
                movie_id:
                  type: integer
                name:
                  type: string
                email:
                  type: string
                review:
                  type: string
                rating:
                  type: integer
        responses:
          201:
            description: Review added successfully.
          400:
            description: Invalid input.
        """
        data = request.get_json()
        movie_id = data.get("movie_id")
        name = data.get("name")
        email = data.get("email")
        review = data.get("review")
        rating = data.get("rating")

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
        INSERT INTO reviews (movie_id, name, email, review, rating)
        VALUES (%s, %s, %s, %s, %s)
        """, (movie_id, name, email, review, rating))
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Review added successfully!"}), 201

    @app.route("/fetch_movie_data", methods=["GET"])
    def fetch_movie_data():
        """
        Fetch movie data from OMDb API and add it to the database.
        ---
        parameters:
          - name: title
            in: query
            type: string
            required: true
            description: The title of the movie to fetch.
        responses:
          201:
            description: Movie fetched and added successfully.
          404:
            description: Movie not found.
        """
        movie_title = request.args.get("title")
        api_key = os.getenv("API_KEY")
        url = f"http://www.omdbapi.com/?t={movie_title}&apikey={api_key}"

        response = requests.get(url)
        movie_data = response.json()

        if movie_data["Response"] == "True":
            title = movie_data["Title"]
            year = movie_data["Year"]
            description = movie_data["Plot"]
            poster_url = movie_data["Poster"]

            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("""
            INSERT INTO movies (title, year, description, poster_url)
            VALUES (%s, %s, %s, %s)
            """, (title, year, description, poster_url))
            conn.commit()
            cur.close()
            conn.close()

            return jsonify({"message": "Movie fetched and added successfully!"}), 201
        else:
            return jsonify({"error": "Movie not found"}), 404
        
    @app.route("/delete_movie/<int:movie_id>", methods=["DELETE"])
    def delete_movie(movie_id):
        """
        Delete a movie by its ID.
        ---
        parameters:
          - name: movie_id
            in: path
            type: integer
            required: true
            description: The ID of the movie to delete.
        responses:
          200:
            description: Movie deleted successfully.
          404:
            description: Movie not found.
        """
        conn = get_db_connection()
        cur = conn.cursor()
        try:
            # Check if the movie exists
            cur.execute("SELECT id FROM movies WHERE id = %s;", (movie_id,))
            if not cur.fetchone():
                return jsonify({"error": "Movie not found"}), 404

            # Delete the movie
            cur.execute("DELETE FROM movies WHERE id = %s;", (movie_id,))
            conn.commit()
            return jsonify({"message": "Movie deleted successfully!"}), 200
        except Exception as e:
            conn.rollback()
            return jsonify({"error": str(e)}), 500
        finally:
            cur.close()
            conn.close()

    @app.route("/update_review/<int:review_id>", methods=["PUT"])
    def update_review(review_id):
        """
        Update a review by its ID.
        ---
        parameters:
          - name: review_id
            in: path
            type: integer
            required: true
            description: The ID of the review to update.
          - name: body
            in: body
            required: true
            schema:
              type: object
              properties:
                name:
                  type: string
                email:
                  type: string
                review:
                  type: string
                rating:
                  type: integer
        responses:
          200:
            description: Review updated successfully.
          404:
            description: Review not found.
        """
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        review = data.get("review")
        rating = data.get("rating")

        conn = get_db_connection()
        cur = conn.cursor()
        try:
            # Check if the review exists
            cur.execute("SELECT id FROM reviews WHERE id = %s;", (review_id,))
            if not cur.fetchone():
                return jsonify({"error": "Review not found"}), 404

            # Update the review
            cur.execute("""
            UPDATE reviews
            SET name = %s, email = %s, review = %s, rating = %s
            WHERE id = %s;
            """, (name, email, review, rating, review_id))
            conn.commit()
            return jsonify({"message": "Review updated successfully!"}), 200
        except Exception as e:
            conn.rollback()
            return jsonify({"error": str(e)}), 500
        finally:
            cur.close()
            conn.close()

    @app.route("/delete_review/<int:review_id>", methods=["DELETE"])
    def delete_review(review_id):
        """
        Delete a review by its ID.
        ---
        parameters:
          - name: review_id
            in: path
            type: integer
            required: true
            description: The ID of the review to delete.
        responses:
          200:
            description: Review deleted successfully.
          404:
            description: Review not found.
        """
        conn = get_db_connection()
        cur = conn.cursor()
        try:
            # Check if the review exists
            cur.execute("SELECT id FROM reviews WHERE id = %s;", (review_id,))
            if not cur.fetchone():
                return jsonify({"error": "Review not found"}), 404

            # Delete the review
            cur.execute("DELETE FROM reviews WHERE id = %s;", (review_id,))
            conn.commit()
            return jsonify({"message": "Review deleted successfully!"}), 200
        except Exception as e:
            conn.rollback()
            return jsonify({"error": str(e)}), 500
        finally:
            cur.close()
            conn.close()