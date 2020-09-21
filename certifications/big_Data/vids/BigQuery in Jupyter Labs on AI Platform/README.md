# BigQuery in Jupyter Labs on AI Platform

## Start a JupyterLab Notebook Instance

al platform > notebooks

in juypterlab 

notebook > python3

## Execute a BigQuery query

in the first cell 
```sh
pip install google-cloud-bigquery
pip install google-cloud-bigquery-storage
```
Restart kernel icon > Restart.


in the second cell



second cell
```sql
%%bigquery df  --use_rest_api
SELECT
  departure_delay,
  COUNT(1) AS num_flights,
  APPROX_QUANTILES(arrival_delay, 10) AS arrival_delay_deciles
FROM
  `bigquery-samples.airline_ontime_data.flights`
GROUP BY
  departure_delay
HAVING
  num_flights > 100
ORDER BY
  departure_delay ASC
```

hit shift + enter to run the cell 

View the first five rows of the query's output
```python
df.head()
```

## Make a Plot with Pandas

*  to use the Pandas DataFrame containing our query output to build a plot that depicts how arrival delays correspond to departure delays.

if you dont know pandas take [10 minutes](https://pandas.pydata.org/pandas-docs/stable/user_guide/10min.html)

* To get a DataFrame containing the data we need we first have to wrangle the raw query output

```python
import pandas as pd

percentiles = df['arrival_delay_deciles'].apply(pd.Series)
percentiles.rename(columns = lambda x : '{0}%'.format(x*10), inplace=True)
percentiles.head()
```

* to relate departure delay times to arrival delay times we have to concatenate our percentiles table to the departure_delay field in our original DataFrame

```python
df = pd.concat([df['departure_delay'], percentiles], axis=1)
df.head()
```

* Before plotting the contents of our DataFrame, we'll want to drop extreme values stored in the 0% and 100% fields. 

```python
df.drop(labels=['0%', '100%'], axis=1, inplace=True)
df.plot(x='departure_delay', xlim=(-30,50), ylim=(-50,50));
```

