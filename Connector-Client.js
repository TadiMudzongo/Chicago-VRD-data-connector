(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            { id: "case_number", dataType: tableau.dataTypeEnum.string },
            { id: "date", dataType: tableau.dataTypeEnum.datetime },
            { id: "block", dataType: tableau.dataTypeEnum.string },
            { id: "victimization_primary", dataType: tableau.dataTypeEnum.string },
            { id: "incident_primary", dataType: tableau.dataTypeEnum.string },
            { id: "gunshot_injury_i", dataType: tableau.dataTypeEnum.string },
            { id: "unique_id", dataType: tableau.dataTypeEnum.string },
            { id: "zip_code", dataType: tableau.dataTypeEnum.string },
            { id: "ward", dataType: tableau.dataTypeEnum.int },
            { id: "community_area", dataType: tableau.dataTypeEnum.string },
            { id: "street_outreach_organization", dataType: tableau.dataTypeEnum.string },
            { id: "area", dataType: tableau.dataTypeEnum.int },
            { id: "district", dataType: tableau.dataTypeEnum.int },
            { id: "beat", dataType: tableau.dataTypeEnum.string },
            { id: "age", dataType: tableau.dataTypeEnum.string },
            { id: "sex", dataType: tableau.dataTypeEnum.string },
            { id: "race", dataType: tableau.dataTypeEnum.string },
            { id: "victimization_fbi_cd", dataType: tableau.dataTypeEnum.string },
            { id: "incident_fbi_cd", dataType: tableau.dataTypeEnum.string },
            { id: "victimization_fbi_descr", dataType: tableau.dataTypeEnum.string },
            { id: "incident_fbi_descr", dataType: tableau.dataTypeEnum.string },
            { id: "victimization_iucr_cd", dataType: tableau.dataTypeEnum.string },
            { id: "incident_iucr_cd", dataType: tableau.dataTypeEnum.string },
            { id: "victimization_iucr_secondary", dataType: tableau.dataTypeEnum.string },
            { id: "incident_iucr_secondary", dataType: tableau.dataTypeEnum.string },
            { id: "homicide_victim_first_name", dataType: tableau.dataTypeEnum.string },
            { id: "homicide_victim_mi", dataType: tableau.dataTypeEnum.string },
            { id: "homicide_victim_last_name", dataType: tableau.dataTypeEnum.string },
            { id: "month", dataType: tableau.dataTypeEnum.int },
            { id: "day_of_week", dataType: tableau.dataTypeEnum.int },
            { id: "hour", dataType: tableau.dataTypeEnum.int },
            { id: "location_description", dataType: tableau.dataTypeEnum.string },
            { id: "state_house_district", dataType: tableau.dataTypeEnum.string },
            { id: "state_senate_district", dataType: tableau.dataTypeEnum.string },
            { id: "updated", dataType: tableau.dataTypeEnum.datetime },
            { id: "latitude", dataType: tableau.dataTypeEnum.float },
            { id: "longitude", dataType: tableau.dataTypeEnum.float },
            { id: "location", dataType: tableau.dataTypeEnum.geometry }
        ];

        var tableSchema = {
            id: "ChicagoHomicidesandNonFatalShootings",
            alias: "Victims of Homicides and Non-Fatal Shootings",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
    var apiBase = "https://data.cityofchicago.org/resource/gumc-mgzr.json";
    var limit = 1000; // max rows per API request
    var offset = 0;

    function getNextChunk() {
        var apiUrl = `${apiBase}?$limit=${limit}&$offset=${offset}`;

        $.getJSON(apiUrl, function (data) {
            if (!data || data.length === 0) {
                // No more data, finish
                doneCallback();
                return;
            }

            var tableData = [];

            for (var i = 0; i < data.length; i++) {
                var row = data[i];
                tableData.push({
                    case_number: row.case_number,
                    date: row.date,
                    block: row.block,
                    victimization_primary: row.victimization_primary,
                    incident_primary: row.incident_primary,
                    gunshot_injury_i: row.gunshot_injury_i,
                    unique_id: row.unique_id,
                    zip_code: row.zip_code,
                    ward: row.ward ? parseInt(row.ward) : null,
                    community_area: row.community_area,
                    street_outreach_organization: row.street_outreach_organization,
                    area: row.area ? parseInt(row.area) : null,
                    district: row.district ? parseInt(row.district) : null,
                    beat: row.beat,
                    age: row.age,
                    sex: row.sex,
                    race: row.race,
                    victimization_fbi_cd: row.victimization_fbi_cd,
                    incident_fbi_cd: row.incident_fbi_cd,
                    victimization_fbi_descr: row.victimization_fbi_descr,
                    incident_fbi_descr: row.incident_fbi_descr,
                    victimization_iucr_cd: row.victimization_iucr_cd,
                    incident_iucr_cd: row.incident_iucr_cd,
                    victimization_iucr_secondary: row.victimization_iucr_secondary,
                    incident_iucr_secondary: row.incident_iucr_secondary,
                    homicide_victim_first_name: row.homicide_victim_first_name,
                    homicide_victim_mi: row.homicide_victim_mi,
                    homicide_victim_last_name: row.homicide_victim_last_name,
                    month: row.month ? parseInt(row.month) : null,
                    day_of_week: row.day_of_week ? parseInt(row.day_of_week) : null,
                    hour: row.hour ? parseInt(row.hour) : null,
                    location_description: row.location_description,
                    state_house_district: row.state_house_district,
                    state_senate_district: row.state_senate_district,
                    updated: row.updated,
                    latitude: row.latitude ? parseFloat(row.latitude) : null,
                    longitude: row.longitude ? parseFloat(row.longitude) : null,
                    location: row.location
                });
            }

            table.appendRows(tableData);
            offset += limit;
            getNextChunk(); // fetch next chunk recursively
        });
    }

    getNextChunk(); // start the first chunk
};



    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Chicago Victims of Homicides and Non-Fatal Shootings 1991 - Present";
        tableau.submit();
    });
});

