import runDBQuery as runQuery

def getAll_patient():
    query = """select f_name,l_name,b_date,p_email from patient;"""
    records = runQuery.queryDB(query)
    return records

def getPatient_info(data):
    patient_query = """select * from patient where p_email = \'"""+data['p_email']+"""\';"""
    patient_record = runQuery.queryDB(patient_query)
    return patient_record