import runDBQuery as runQuery

def login_pat(user_email, user_pass):
    query = """SELECT p_email, user_password, is_admin FROM patient WHERE p_email=\'"""+user_email+"""\';"""
    records = runQuery.queryDB(query)
    if records:
        if user_pass == records[0]["user_password"]:
            return True, records[0]["is_admin"]
    return False, False

def login_doc(user_email, user_pass):
    query = """SELECT d_email, user_password, is_admin FROM doctor WHERE d_email=\'"""+user_email+"""\';"""
    records = runQuery.queryDB(query)
    if records:
        if user_pass == records[0]["user_password"]:
            return True, records[0]["is_admin"]
    return False, False
