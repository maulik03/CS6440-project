import runDBQuery as runQuery

def getMedicineInformation(data):
    print(data)
    query_1 = """select * from medicine where p_email = \'"""+data['p_email']+"""\'and med_status ='Active';"""
    ##print(query_1)
    reading_records = runQuery.queryDB(query_1)
    return reading_records

## add new medicine

def insert_medicine(data):
    # print(data)
    query = """
    INSERT INTO medicine (p_email,med_name, med_info, med_status)
    VALUES (\'"""+data['p_email']+"""\',\'"""+data['med_name']+"""\', \'"""+data['med_info']+"""\', \'"""+data['med_status']+"""\');"""
    
    ##print(query)
    records = runQuery.updateDB(query)
    return records

## update exisiting medicine status
def update_medstatus(data):
    query = """UPDATE medicine SET  med_status=\'"""+data['med_status']+"""\' WHERE p_email=\'"""+data['p_email']+"""\'and med_name=\'"""+data['med_name']+"""\'and med_info=\'"""+data['med_info']+"""\';"""
    
    upd_records = runQuery.updateDB(query)
    return upd_records

## get all medicine for patient

def getALL_Medicines(data):
    # print(data)
    query_1 = """select * from medicine where p_email = \'"""+data['p_email']+"""\';"""
    ##print(query_1)
    reading_records = runQuery.queryDB(query_1)
    return reading_records

