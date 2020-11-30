import runDBQuery as runQuery

def getrequiredPatientinfo(data):
    # print("-----")
    # print(data)
    # print("-----")
    select_query = """select p.p_email,p.f_name,p.l_name,p.b_date,m.med_name,m.med_info from medicine as m
    inner join patient as p on p.p_email = m.p_email
    where m.med_name = \'"""+data['med_name']+"""\';"""
    # print(select_query)

    reading_records = runQuery.queryDB(select_query)
    return reading_records

def insertprescription(data):
    # print(data)
    query = """
    INSERT INTO prescription(p_email, d_email, pre_medname, p_medquantity, p_issuedate, p_refills, p_duration)
	VALUES (\'"""+data['patient']+"""\' ,\'"""+data['doctor']+"""\', \'"""+data['medicine']+"""\',\'"""+data['med_qua']+"""\', \'"""+data['issueDate']+"""\', \'"""+data['refils']+"""\', \'"""+data['duration']+"""\');"""
    
    ##print(query)
    records = runQuery.updateDB(query)
    return records

def viewpreDetails(data):
    # print("-----")
    # print(data)
    # print("-----")
    select_query = """select * from Prescription where p_email= \'"""+data['p_email']+"""\';"""
    # print(select_query)

    reading_records = runQuery.queryDB(select_query)
    return reading_records