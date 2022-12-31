#Verify EMail
import pymysql
import time
import sys
try:
    token = sys.argv[1]
    conn = pymysql.connect(host="127.0.0.1", port=3306, user='Lightspeed30', password="!!Vlxj1215", db="userinfo")
    cur = conn.cursor()
    query = f'UPDATE userinfo SET emailverify = 1 where emailhash = "{token}";'
    cur.execute(query)
    conn.commit()
    print(1)
except:
    print(0)