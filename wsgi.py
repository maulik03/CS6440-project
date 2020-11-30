from flask import Flask, render_template, request
import json
import datetime
from pyfunctions import loginFunction,patientList,addBloodSugar,medicine,pharmacy,prescription
import configparser
import os

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/getPatientLogin", methods=['GET','POST'])
def getpatient_login():
    data = request.get_json()
    user_email = data['email']
    user_pass = data['password']
    loginTrue, is_admin = loginFunction.login_pat(user_email, user_pass)
    return json.dumps({"login":loginTrue, "isAdmin":is_admin})

@app.route("/getDoctorLogin", methods=['GET','POST'])
def getdoctor_login():
    data = request.get_json()
    user_email = data['email']
    user_pass = data['password']
    loginTrue, is_admin = loginFunction.login_doc(user_email, user_pass)
    return json.dumps({"login":loginTrue, "isAdmin":is_admin})

##Patient List on Doctor' homepage
@app.route("/getPatients", methods=['GET','POST'])
def getpatients():
    patients_data = patientList.getAll_patient()
    return json.dumps(patients_data)

## Add Blood Sugar reading for patients
@app.route("/insertBloodSugar", methods=['GET','POST'])
def insertBloodSugar():
    data = request.get_json()
    # print(data)
    # print("---")
    raw_data = addBloodSugar.insertBloodSugarReading(data)
    return  json.dumps(raw_data)

## get Blood Sugar reading for patients
@app.route("/getBloodSugarReading", methods=['GET','POST'])
def getBloodSugarReading():
    data = request.get_json()
    reading_data = addBloodSugar.getBloodSugarReading(data)
    # print(reading_data)
    return json.dumps(reading_data)

## get the patient information
@app.route("/getPatientInformation", methods=['GET','POST'])
def getPatientInformation():
    data = request.get_json()
    reading_data = patientList.getPatient_info(data)
    # print(reading_data)
    return json.dumps(reading_data)

## get the medicine information
@app.route("/getMedicineInformation", methods=['GET','POST'])
def getMedicineInformation():
    data = request.get_json()
    reading_data = medicine.getMedicineInformation(data)
    # print(reading_data)
    return json.dumps(reading_data)

## add the medicine 
@app.route("/addMedicine", methods=['GET','POST'])
def addMedicine():
    data = request.get_json()
    reading_data = medicine.insert_medicine(data)
    # print(reading_data)
    return json.dumps(reading_data)

## get all the medicines 
@app.route("/getEverypatientmeds", methods=['GET','POST']) 
def getEverypatientmeds():
    data = request.get_json()
    reading_data = medicine.getALL_Medicines(data)
    # print(reading_data)
    return json.dumps(reading_data)

## update the medicine  status
@app.route("/updatemedstatus", methods=['GET','POST'])
def updatemedstatus():
    data = request.get_json()
    reading_data = medicine.update_medstatus(data)
    # print(reading_data)
    return json.dumps(reading_data)



## get the List of Pharmacy information
@app.route("/getAllPharmacy", methods=['GET','POST'])
def getallPharmacy():
    reading_data = pharmacy.getAll_pharmacy()
    # print(reading_data)
    return json.dumps(reading_data)

## get the List of Pharmacy information
@app.route("/addmyPharmacy", methods=['GET','POST'])
def addmyPharmacy():
    data = request.get_json()
    reading_data = pharmacy.insert_pharmacy(data)
    # print(reading_data)
    return json.dumps(reading_data)

## get the List of Pharmacy information
@app.route("/getmyPharmacy", methods=['GET','POST'])
def getmyPharmacy():
    data = request.get_json()
    reading_data = pharmacy.select_pharmacy(data)
    # print(reading_data)
    return json.dumps(reading_data)

@app.route("/deletemyPharmacy", methods=['GET','POST'])
def deletemyPharmacy():
    data = request.get_json()
    reading_data = pharmacy.del_pharmacy(data)
    # print(reading_data)
    return json.dumps(reading_data)

## get the List of prescription information
@app.route("/createPrescription", methods=['GET','POST'])
def showRequiredInfo():
    data = request.get_json()
    reading_data = prescription.getrequiredPatientinfo(data)
    # print(reading_data)
    return json.dumps(reading_data)

@app.route("/addprescriptionforMed", methods=['GET','POST'])
def insertprescriptionformeds():
    data = request.get_json()
    reading_data = prescription.insertprescription(data)
    # print(reading_data)
    return json.dumps(reading_data)

@app.route("/viewPrescription", methods=['GET','POST'])
def viewPrescription():
    data = request.get_json()
    reading_data = prescription.viewpreDetails(data)
    # print(reading_data)
    return json.dumps(reading_data)

if __name__ == "__main__":
     app.run(host='0.0.0.0',port=5050)
