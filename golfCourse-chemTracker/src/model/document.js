class Document{
    constructor(json) {
        // Product
    this.id=json['id']
      this.productName=json['productname']
      this.supplier = json["supplier"]
      this.fomulation=json['formulation']
    //   this.formulationFlow = json["suformulationFlowpplier"]
    //   this.formulationGran = json["formulationGran"]
    //   this.formulationWet = json["formulationWet"]
    //   this.formulationEmul = json["formulationEmul"]
    //   this.formulationOther = json["formulationOther"]
    //   this.sigWordCaution = json["sigWordCaution"]
    //   this.sigWordWarning = json["sigWordWarning"]
    //   this.sigWordDanger = json["sigWordDanger"]
      this.epaRegNum = json["epaRegNum"]
      this.epaEstNum = json["epaEstNum"]
      this.locGreens = json["slocGreensupplier"]
      this.locTees = json["locTees"]
      this.locFairways = json["locFairways"]
      this.locOther = json["locOther"]
      this.target = json["target"]
      // Equipment and Rates
      this.vehicle = json["vehicle"]
      this.gear = json["gear"]
      this.rpm = json["rpm"]
      this.mph = json["mph"]
      this.sprayer = json["sprayer"]
      this.nozzle = json["nozzle"]
      this.pressure = json["pressure"]
      this.tankAmt = json["tankAmt"]
      this.tankWater = json["tankWater"]
      this.adjuvant = json["adjuvant"]
      this.totalApplied = json["totalApplied"]
      this.appRateOz = json["appRateOz"]
      this.appRateLbs = json["appRateLbs"]
      this.wateredIn = json["wateredIn"]
      this.wateredMin = json["wateredMin"]
      // Weather and Precautions
      this.temp = json["temp"]
      this.humidity = json["humidity"]
      this.wind = json["wind"]
      this.date = json["date"]
      this.purs = json["purs"]
      this.timeStart = json["timeStart"]
      this.timeEnd = json["timeEnd"]
      this.protectiveEq = json["protectiveEq"]
    //   this.protectiveLong = json["protectiveLong"]
    //   this.protectiveShoes = json["protectiveShoes"]
    //   this.protectiveBoots = json["protectiveBoots"]
    //   this.protectiveGloves = json["protectiveGloves"]
    //   this.protectiveHat = json["protectiveHat"]
    //   this.protectiveEye = json["protectiveEye"]
    //   this.protectiveOther = json["protectiveOther"]
      this.disposed = json["disposed"]
      this.cleaned = json["cleaned"]
      this.msds = json["msds"]
      this.lbsN = json["lbsN"]
      this.lbsP2O5 = json["lbsP2O5"]
      this.lbsK2O = json["lbsK2O"]
      this.signature = json["signature"]
      this.sigDate = json["sigDate"]
    }
}
export default Document;