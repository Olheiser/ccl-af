type ProvinceEmailAddress = {
    AB: string[];
    BC: string[];
    MB: string[];
    NB: string[];
    NL: string[];
    NS: string[];
    NT: string[];
    NU: string[];
    ON: string[];
    PE: string[];
    QC: string[];
    SK: string[];
    YT: string[];
  };

const emailAddress: ProvinceEmailAddress = {
    "AB": [],
    "BC": [],
    "MB": [],
    "NB": [],
    "NL": [],
    "NS": [],
    "NT": [],
    "NU": [],
    "ON": [],
    "PE": [],
    "QC": [],
    "SK": ["tanner.olheiser@gmail.com", "olheisersk@gmail.com"],
    "YT": []
}

export default emailAddress;
export type { ProvinceEmailAddress };