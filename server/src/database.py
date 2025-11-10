from pymongo import MongoClient

def connect_to_database(app):
    app.mongo_client = MongoClient(app.config["MONGO_URI"])
    app.db = app.mongo_client.get_database(app.config["MONGO_DB_NAME"])
    app.db.sessions.create_index("expiresAt", expireAfterSeconds=0)
    app.db.jobs.create_index("tenantId")
    app.db.tenants.create_index("email")
