class Applicant:
    def __init__(self, id,gmi,credit_card_p,car_p,slp,appraised_v, down_p,loan_a,monthly_mortgage_a,credit_score):
        self.id = int(id)
        self.gmi = int(gmi)
        self.credit_card_p = int(credit_card_p)
        self.car_p = int(car_p)
        self.slp = int(slp)
        self.appraised_v = int(appraised_v)
        self.down_p = int(down_p)
        self.loan_a = int(loan_a)
        self.monthly_mortgage_a = int(monthly_mortgage_a)
        self.credit_score = int(credit_score)
    
    def __str__(self):
        return f" Applicant ID  - {self.id} - GMI  =  {self.gmi}"
    

    def getLTV(self):
        ltv = (self.appraised_v-self.down_p)//self.appraised_v
        print(ltv)


import csv
with open('dummy.csv', newline='') as csvfile:
    print(csvfile)
    spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
    for row in spamreader:
        row = row[0].split(',')
        A1 = Applicant(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9])
        A1.getLTV()


