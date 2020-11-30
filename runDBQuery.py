import psycopg2
from psycopg2.extras import RealDictCursor
import json
import os
from datetime import date
import json

DATABASE_URL = os.environ['DATABASE_URL']

class DateEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, date):
            return str(obj)
        return json.JSONEncoder.default(self, obj)

def queryDB(query):
    try:
        connection = psycopg2.connect(DATABASE_URL, sslmode='require')
        # connection = psycopg2.connect(user = "postgres",
        #                               password = "987321",
        #                               host = "localhost",
        #                               port = "5432",
        #                               database = "copd")
        cur = connection.cursor(cursor_factory=RealDictCursor)
        # Print PostgreSQL Connection properties
    #    print ( connection.get_dsn_parameters(),"\n")

        # Print PostgreSQL version
        cur.execute(query)
#        cur.execute("SELECT email, user_password FROM regularuser;")
        records = cur.fetchall()


    except (Exception, psycopg2.Error) as error :
        print ("Error while connecting to PostgreSQL", error)
    finally:
        #closing database connection.
            if(connection):
                cur.close()
                connection.close()
    return json.loads(json.dumps(records,cls=DateEncoder))

def updateDB(query):
    try:
        connection = psycopg2.connect(DATABASE_URL, sslmode='require')
        # connection = psycopg2.connect(user = "postgres",
        #                               password = "987321",
        #                               host = "localhost",
        #                               port = "5432",
        #                               database = "copd")
        cur = connection.cursor(cursor_factory=RealDictCursor)
        # Print PostgreSQL Connection properties
    #    print ( connection.get_dsn_parameters(),"\n")

        # Print PostgreSQL version
        cur.execute(query)
#        cur.execute("SELECT email, user_password FROM regularuser;")
        connection.commit()


    except (Exception, psycopg2.Error) as error :
        # print ("Error while connecting to PostgreSQL", error)
        print ("Error running query", error)
        return False
    finally:
        #closing database connection.
            if(connection):
                cur.close()
                connection.close()
    return True

def updateDBReturningRecord(query):
    try:
        connection = psycopg2.connect(DATABASE_URL, sslmode='require')
        # connection = psycopg2.connect(user = "postgres",
        #                               password = "987321",
        #                               host = "localhost",
        #                               port = "5432",
        #                               database = "copd")
        cur = connection.cursor(cursor_factory=RealDictCursor)
        # Print PostgreSQL Connection properties
    #    print ( connection.get_dsn_parameters(),"\n")

        # Print PostgreSQL version
        cur.execute(query)
        records = cur.fetchall()
#        cur.execute("SELECT email, user_password FROM regularuser;")
        connection.commit()


    except (Exception, psycopg2.Error) as error :
        # print ("Error while connecting to PostgreSQL", error)
        print ("Error running query", error)
        return []
    finally:
        #closing database connection.
            if(connection):
                cur.close()
                connection.close()
    return json.loads(json.dumps(records,cls=DateEncoder))
