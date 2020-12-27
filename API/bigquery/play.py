import sys
sys.path[0] += "\\site-packages"
for path in sys.path:
    print(path)
# end


from google.cloud import bigquery
client = bigquery.Client()
