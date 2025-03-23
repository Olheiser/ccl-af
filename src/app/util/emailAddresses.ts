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
    "SK": ["gul@butzlaw.ca", "deanna@jbklawoffice.com", "bjaggi@jbklawoffice.com", "estes@advocatelaw.ca", "brandon.cain@runyowa.com"],
    "YT": []
}

export default emailAddress;
export type { ProvinceEmailAddress };