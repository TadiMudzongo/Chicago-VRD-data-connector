# Tableau Web Data Connector – Chicago Victims of Homicides and Non-Fatal Shootings (1991–Present)

This repository contains a Tableau Web Data Connector (WDC) that allows you to import data from the City of Chicago’s open data API into Tableau. The data includes records of **non-fatal shootings** and **homicide victims** from **1991 to the present**, offering a powerful foundation for analysis and visualization.

---

## 🚀 How to Use This Connector in Tableau

1. Open **Tableau Desktop**.
2. Choose **"Web Data Connector"** as your data source.
3. Enter the following URL:

   🔗 [https://tadimudzongo.github.io/Chicago-VRD-data-connector/Homicides-and-Non-Fatal-Shootings.html](https://tadimudzongo.github.io/Chicago-VRD-data-connector/Homicides-and-Non-Fatal-Shootings.html)

4. Click the **"Get Latest Data"** button.
5. Wait for the data to load, and start exploring in Tableau.

> ℹ️ Note: Depending on your version of Tableau, you may need to allow access to external web connectors under security settings.

---

## 📁 Repository Contents

| File                          | Description                                                        |
|-------------------------------|--------------------------------------------------------------------|
| `Homicides-and-Non-Fatal-Shootings.html` | The entry point for Tableau; defines the connector interface and triggers data loading. |
| `ChicagoShootings.js`         | JavaScript logic for the Web Data Connector (schema + data fetching). |
| `README.md`                   | Documentation for using and understanding this connector.          |

---

## 📊 About the Data Source

- **Source**: [City of Chicago – Non-Fatal Shooting Victims Dataset](https://data.cityofchicago.org/Public-Safety/Non-Fatal-Shooting-Victims/gumc-mgzr)
- **Data Format**: JSON API
- **Fetch Method**: Paginated requests using `$limit` and `$offset`
- **API Endpoint**:  
  `https://data.cityofchicago.org/resource/gumc-mgzr.json`

The dataset includes over 35 fields such as:

- Incident details: `case_number`, `date`, `location_description`, `block`
- Victim demographics: `age`, `sex`, `race`
- Geographic data: `latitude`, `longitude`, `zip_code`, `community_area`
- Law enforcement details: `district`, `beat`, `ward`, `IUCR/FBI codes`
- Outreach data: `street_outreach_organization`

---

## 🛠️ How It Works

- `getSchema()`: Defines the structure of the data for Tableau (columns and types).
- `getData()`: Fetches data in chunks of 1,000 rows using a recursive loop.
- Supports robust parsing of numeric, datetime, geographic, and string fields.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgments

- [City of Chicago Open Data Portal](https://data.cityofchicago.org)
- [Tableau Web Data Connector SDK](https://tableau.github.io/webdataconnector/)

---

## ✉️ Contact

Built by [Tadiwanashe Mudzongo](https://github.com/TadiMudzongo)  
Feel free to open issues or pull requests for improvements.


