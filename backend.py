class Applicant:
    def __init__(self, id,gmi,credit_card_p,car_p,slp,appraised_v, down_p,loan_a,monthly_mortgage_a,credit_score):
        self.id = int(id)
        self.gmi = int(gmi)
        self.credit_card_p = int(credit_card_p)
        self.car_p = int(car_p)
        self.slp = int(slp)
        self.appraised_v = int(appraised_v)
        self.down_p = float(down_p)
        self.loan_a = float(loan_a)
        self.monthly_mortgage_a = float(monthly_mortgage_a)
        self.credit_score = int(credit_score)
   
    def __str__(self):
        return f" Applicant ID  - {self.id} - GMI  =  {self.gmi}"
   
 
    def getLTV(self):
        self.ltv = 100*(self.appraised_v-self.down_p)//self.appraised_v
        return(self.ltv)
   
    def getDTI(self):
        self.dti = 100*(self.gmi -(self.car_p + self.credit_card_p + self.monthly_mortgage_a + self.slp))//self.gmi
        return(self.dti)
   
    def getFeDTI(self):
        self.fedti = 100*(self.gmi -self.monthly_mortgage_a)//self.gmi
        return(self.fedti)
   
    def isapproved(self):
        if self.getLTV() <= 80 and self.getDTI() < 36 and self.getFeDTI() < 28 and self.credit_score >= 640:
            self.approved = "Y"
        else:
            self.approved = "N"
        return(self.approved)
       
    def getremarks(self):
        self.remarks = "Suggestion --"
        count= 0
        if self.getDTI() > 36:
            count +=1
            self.remarks += "\n"+str(count)+". We suggest to transfer your high-interest loans to a low-interest credit card.\n   Keep in mind that having too many credit cards will also make buying a house more difficult."
        if self.getFeDTI() > 28:
            count +=1
            self.remarks += "\n"+str(count)+". We suggest paying down revolving or installment debts, reducing housing costs, and increasing income"
        if self.getLTV() > 80:
            count +=1
            self.remarks += "\n"+str(count)+". Your Loan-To-Value (LTV) is above or at 80%.\n  We suggest you to purchase Private Mortgage Insurance (PMI) which will increase the total cost in payments made each month"
        if self.credit_card_p < 640:
            count +=1
            self.remarks +="\n"+str(count)+". We suggest to pay your credit card amount every month and to not miss any important payments.\n  Continually making payments will increase your creidt score which will allow you to purchase a home."
        return self.remarks
 
import csv
import json
# with open('newfilename.csv', 'w') as f2:
with open('dummy.csv') as csv_file:
    spamreader = csv.reader(csv_file, delimiter=',')
    next(spamreader)
    count =0
    for prow in spamreader:
        A1 = Applicant(prow[0],prow[1],prow[2],prow[3],prow[4],prow[5],prow[6],prow[7],prow[8],prow[9])
        # print(A1.getLTV(),A1.getDTI(),A1.getFeDTI())
        # print(A1.isapproved())
        prow.append(A1.isapproved())    
        prow.append(A1.getremarks())
        data = {
            #gmi,credit_card_p,car_p,slp,appraised_v, down_p,loan_a,monthly_mortgage_a,credit_score
            "id": prow[0],
            "gmi": prow[1],
            "credit_card_p": prow[2],
            "car_p": prow[3],
            "slp": prow[4],
            "appraised_v": prow[5],
            "down_p": prow[6],
            "loan_a": prow[7],
            "monthly_mortgage_a": prow[8],
            "credit_score": prow[9],
            "approved": prow[10],
            "suggestions" : prow[11]
 
        }
 
 
        with open(".\hackUTD2023\my-app\src\data.json", "w") as json_file:
            json.dump(data, json_file)
 
 