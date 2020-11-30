import runDBQuery as runQuery

def getAll_pharmacy():
    query_1 = """select * from pharmacy;"""
    ##print(query_1)
    reading_records = runQuery.queryDB(query_1)
    return reading_records


#select pharmacy for the patients
def select_pharmacy(data):
    select_query = """select pharm.* from user_pharmacy as u_pharm
    inner join pharmacy as pharm on pharm.pharm_number = u_pharm.pharm_number where p_email = \'"""+data['p_email']+"""\';"""
    # print(select_query)

    reading_records = runQuery.queryDB(select_query)
    return reading_records

#add the pharmacy for the patients
def insert_pharmacy(data):
    # print(data)
    insert_query = """INSERT INTO user_pharmacy (pharm_number,p_email) values(\'"""+data['id']+"""\' , \'"""+data['p_email']+"""\');"""
    # print("-------")
    # print(insert_query)
    records = runQuery.updateDB(insert_query)
    # print(records)
    return records
## delete exisiting pharmacy for patient
def del_pharmacy(data):
    delete_query = """DELETE FROM user_pharmacy WHERE p_email =\'"""+data['p_email']+"""\';"""
    # print(delete_query)
    records = runQuery.updateDB(delete_query)
    return records

