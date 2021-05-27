import axios from "axios";
class Backend {
  constructor() {
    this.options = {
      headers: { "X-Api-Key": "RTR6SrTkDj3DnPLawIaDQ7QsMJ3qDZ332u7PMMOs" },
    };
  }
  async getNameLocation(productName, location) {
    const body = {
      mode: "name_location",
      queryStringParameters: {
        productName: productName,
        location: location,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body,
      this.options
    );
    return JSON.parse(response.data["body"]);
  }
  async getDateLocation(start, end, location) {
    const body = {
      mode: "location_date",
      queryStringParameters: {
        start: start,
        end: end,
        location: location,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body,
      this.options
    );
    return JSON.parse(response.data["body"]);
  }
  async getLocation(location) {
    const body = {
      mode: "location",
      queryStringParameters: {
        location: location,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body,
      this.options
    );
    return JSON.parse(response.data["body"]);
  }
  async getDateRange(start, end) {
    const body = {
      mode: "month_date",
      queryStringParameters: {
        start: start,
        end: end,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body,
      this.options
    );
    return JSON.parse(response.data["body"]);
  }
  async getDateProductLocation(productName, location, start, end) {
    const body = {
      mode: "name_location_date",
      queryStringParameters: {
        name: productName,
        location: location,
        start: start,
        end: end,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body,
      this.options
    );
    return JSON.parse(response.data["body"]);
  }
  async getDateProduct(start, end, productName) {
    const body = {
      mode: "name_date",
      queryStringParameters: {
        start: start,
        end: end,
        productName: productName,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body,
      this.options
    );
    return JSON.parse(response.data["body"]);
  }
  async getByName(productName) {
    const body = {
      mode: "name",
      queryStringParameters: {
        productName: productName,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body,
      this.options
    );
    return JSON.parse(response.data["body"]);
  }
  async getByMonth(month) {
    const body = {
      mode: "month",
      queryStringParameters: {
        month: month,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body,
      this.options
    );
    return JSON.parse(response.data["body"]);
  }
  async getByMonthDate(start, end, month) {
    const body = {
      mode: "month_date",
      queryStringParameters: {
        start: start,
        end: end,
        month: month,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body,
      this.options
    );
    return JSON.parse(response.data["body"]);
  }
  async getTargetDate(start, end, target) {
    const body = {
      mode: "target_date",
      queryStringParameters: {
        start: start,
        end: end,
        target: target,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body,
      this.options
    );
    return JSON.parse(response.data["body"]);
  }
  async getTarget(target) {
    const body = {
      mode: "target",
      queryStringParameters: {
        target: target,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body,
      this.options
    );
    return JSON.parse(response.data["body"]);
  }
  async getNameTargetDate(start, end, nameTarget) {
    const body = {
      mode: "name_target_date",
      queryStringParameters: {
        start: start,
        end: end,
        name_target_date: nameTarget,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body,
      this.options
    );
    return JSON.parse(response.data["body"]);
  }
  async getNameTarget(target, productName) {
    const body = {
      mode: "name_target",
      queryStringParameters: {
        target: target,
        productName: productName,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body,
      this.options
    );
    return JSON.parse(response.data["body"]);
  }
  async put(document) {
    const body = document;
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/",
      body,
      this.options
    );
    return JSON.parse(response.data["body"]);
  }
  async getItem() {}
  async update(oldDoc, newDoc) {
    if (oldDoc !== newDoc) {
      let body = {
        id: oldDoc["id"],
        updateStringParameters: {},
      };
      for (const property in oldDoc) {
        if (oldDoc[property] != newDoc[property])
          body["updateStringParameters"][property] = newDoc[property];
      }
      const response = await axios.patch(
        "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/",
        body,
        this.options
      );
      return JSON.parse(response.data["body"]);
    }
  }
  async getDocFromImage(image) {
    try {
      let image_base64 = await this.convertBase64(image);
      const body = {
        Image: image_base64.replace(/^data:image\/\w+;base64,/, ""),
      };
      const response = await axios.post(
        "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/gettextfromimage",
        body,
        this.options
      );
      let temp = {};
      let result = String(response.data["body"]).split(/\\n/);
      for (var i = 0; i < result.length; i++) {
        if (result[i] === "Product Name:") temp["productName"] = result[i + 1];
        if (result[i] === "Supplier:") temp["supplier"] = result[i + 1];
        if (result[i] === "EPA Registration #")
          temp["epaRegNum"] = result[i + 1];
        if (result[i] === "EPA Est. #") temp["epaEstNum"] = result[i + 1];
        if (result[i] === "Target:") temp["target"] = result[i + 1];
        if (result[i] === "Vehicle:") temp["vehicle"] = result[i + 1];
        if (result[i] === "Gear:") temp["gear"] = result[i + 1];
        if (result[i] === "RPM:") temp["rpm"] = result[i + 1];
        if (result[i] === "MPH:") temp["mph"] = result[i + 1];
        if (result[i] === "Sprayer/Spreader:") temp["sprayer"] = result[i + 1];
        if (result[i] === "Nozzles/Setting:") temp["nozzle"] = result[i + 1];
        if (result[i] === "Pressure:") temp["pressure"] = result[i + 1];
        if (result[i] === "Tank Mix: Amount of Product:")
          temp["tankAmt"] = result[i + 1];
        if (result[i] === "`per") temp["tankWater"] = result[i + 1];
        if (result[i] === "Adjuvant/Dye:") temp["adjuvant"] = result[i + 1];
        if (result[i] === "Total Amount of Product Applied:")
          temp["totalApplied"] = result[i + 1];
        if (result[i] === "Application rate:")
          temp["appRateOz"] = result[i + 1];
        if (result[i] === "Minutes:") temp["wateredMin"] = result[i + 1];
        if (result[i] === "Temperature:") temp["temp"] = result[i + 1];
        if (result[i] === "F Humidity:") temp["humidity"] = result[i + 1];
        if (result[i] === "% Wind:") temp["wind"] = result[i + 1];
        if (result[i] === "Date of Application:") temp["date"] = result[i + 1];
        if (result[i] === "PURS") temp["purs"] = result[i + 1];
        if (result[i] === "Time of Application:")
          temp["timeStart"] = result[i + 1];
        if (result[i] === "to") temp["timeEnd"] = result[i + 1];
        if (result[i] === "How was container disposed:")
          temp["disposed"] = result[i + 1];
        if (result[i] === "How was equipment cleaned:")
          temp["cleaned"] = result[i + 1];
        if (result[i] === "Actual lbs of N applied per 1000 ft. 2")
          temp["lbsN"] = result[i - 1];
        if (result[i] === "Actual lbs of P2 O 5 applied per 1000 ft. 2")
          temp["lbsP2O5"] = result[i - 1];
        if (result[i] === "Actual lbs of K2 0 applied per 1000 ft. 2")
          temp["lbsK2O"] = result[i - 1];
        if (result[i] === "Signature:") temp["signature"] = result[i + 1];
        if (result[i] === "Date:") temp["sigDate"] = result[i + 1];
      }
      return Document(temp);
    } catch (error) {
      console.log("Error");
    }
  }
  convertBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  async delete(id) {
    let response = await axios.delete(
      `https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id/delete?file_id=${id}`,
      this.options
    );
    return response;
  }
  async put_template(document) {
    const body = document;
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/template",
      body,
      this.options
    );
    return response;
  }
  async get_template(productName) {
    let response = await axios.get(
      `https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/template?productName=${productName}`,
      this.options
    );
    console.log(response);
    return response;
  }
  async delete_tempalte(productName) {
    let response = await axios.delete(
      `https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/template?productName=${productName}`,
      this.options
    );
    return response;
  }
}

export default Backend;
