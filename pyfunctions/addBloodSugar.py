import runDBQuery as runQuery

def insertBloodSugarReading(data):
    # print(data)
    query = """
    INSERT INTO bloodsugar (p_email,bloodS_level, when_measured, measured_time, entered_date)
    VALUES (\'"""+data['p_email']+"""\',\'"""+data['BloodReading']+"""\', \'"""+data['when_measured']+"""\', \'"""+data['measured_time']+"""\',\'"""+data['date']+"""\');"""
    
    ##print(query)
    records = runQuery.updateDB(query)
    return records


def getBloodSugarReading(data):
    # print(data)
    query_1 = """select * from bloodsugar where p_email = \'"""+data['p_email']+"""\';"""
    ##print(query_1)
    reading_records = runQuery.queryDB(query_1)
    return reading_records