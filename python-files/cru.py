import pymysql
import sys
try:
    id = sys.argv[1]
    pw = sys.argv[2]
    email = sys.argv[3]
    conn = pymysql.connect(host="127.0.0.1", port=3306, user='Lightspeed30', password="!!Vlxj1215", db="userinfo")
    cur = conn.cursor()
    query = f'INSERT INTO `userinfo`(id,pw, email) values("{id}","{pw}", "{email}")'
    cur.execute(query)
    conn.commit()
    print(1)
except:print(0)

