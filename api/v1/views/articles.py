#!/usr/bin/python3
""" articles module for the API """
from api.v1.views import app_views, implement_args
from flask import jsonify, request
from models import storage
from models.article import Article


@app_views.route('/articles', strict_slashes=False, methods=['GET'])
def get_articles():
    articles = storage.all(Article)
    article_list = [article.to_dict() for article in articles.values()]
    article_list = implement_args(article_list)
    return jsonify(article_list)


@app_views.route('/articles/<article_id>', methods=['GET'])
def get_article(article_id):
    article = storage.get(Article, article_id)
    if article is None:
        return jsonify({"error": "Not found"}), 404
    return jsonify(article.to_dict())
