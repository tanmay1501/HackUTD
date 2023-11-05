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
        self.dti = 100*(self.gmi -(self.car_p + self.credit_card_p + self.monthly_mortgage_a+self.slp))//self.gmi
        return(self.dti)
    
    def getFeDTI(self):
        self.fedti = 100*(self.gmi -self.monthly_mortgage_a)//self.gmi
        return(self.fedti)
    
    def isapproved(self):
        if self.getDTI() <= 80 and self.getDTI() < 36 and self.getFeDTI() < 28 and self.slp() >= 640:
            self.approved = "Y"
        else:
            self.approved = "N"
        return(self.approved)
        


    
    


import csv
# with open('newfilename.csv', 'w') as f2:
with open('dummy.csv') as csv_file:
    spamreader = csv.reader(csv_file, delimiter=',')
    next(spamreader)
    for prow in spamreader:
        A1 = Applicant(prow[0],prow[1],prow[2],prow[3],prow[4],prow[5],prow[6],prow[7],prow[8],prow[9])
        # print(A1.getLTV(),A1.getDTI(),A1.getFeDTI())
        # print(A1.isapproved())
        prow.append(A1.isapproved())
        print(prow)
        # f2.write(prow)
    # writer = csv.writer(csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    # for row  in spamreader:
    #     writer.writerow(row)



