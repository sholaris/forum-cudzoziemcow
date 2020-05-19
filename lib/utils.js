export function delParantheses(text) {
  for (var i = 0; i < text.length; i++) {
    var c = text.charAt(i);

    if (c == "(") {
      text = text.substring(0, i) + "" + text.substring(i + 1, text.length);
    }
    if (c == ")") {
      text = text.substring(0, i) + "" + text.substring(i + 1, text.length);
    }
  }
  return text;
}

export function delSpecial(text) {
  for (var i = 0; i < text.length; i++) {
    var c = text.charAt(i);
    if (c == "ń") {
      text = text.substring(0, i) + "n" + text.substring(i + 1, text.length);
    }
    if (c == "ł") {
      text = text.substring(0, i) + "l" + text.substring(i + 1, text.length);
    }
    if (c == "ż" || c == "ź") {
      text = text.substring(0, i) + "z" + text.substring(i + 1, text.length);
    }
    if (c == "ó") {
      text = text.substring(0, i) + "o" + text.substring(i + 1, text.length);
    }
    if (c == "ą") {
      text = text.substring(0, i) + "a" + text.substring(i + 1, text.length);
    }
    if (c == "ę") {
      text = text.substring(0, i) + "e" + text.substring(i + 1, text.length);
    }
    if (c == "ć") {
      text = text.substring(0, i) + "c" + text.substring(i + 1, text.length);
    }
    if (c == "ś") {
      text = text.substring(0, i) + "s" + text.substring(i + 1, text.length);
    }
    if (c == "-") {
      text = text.substring(0, i) + "" + text.substring(i + 1, text.length);
    }
  }
  return text;
}

export function convert(arg) {
  arg = delParantheses(arg);
  arg = delSpecial(arg);
  return arg
    .split(/[\s/]+/)
    .join("-")
    .toLowerCase();
}

export function convertDate(timestamp) {
  var today = new Date();
  var date = new Date(timestamp * 1000);
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();

  let fulldate = "";
  let year_diff = today.getFullYear() - year;
  let month_diff = today.getMonth() - month;
  let day_diff = today.getDate() - day;

  if (year < today.getFullYear()) {
    if (year_diff == 1) {
      fulldate = "1 rok temu";
    } else if (year_diff > 1 && year_diff < 5) {
      fulldate = `${year_diff} lata temu`;
    } else {
      fulldate = `${year_diff} lat temu`;
    }
  } else if (month < today.getMonth()) {
    if (month_diff == 1) {
      fulldate = "1 miesiąc temu";
    } else if (month_diff > 1 && month_diff < 5) {
      fulldate = `${month_diff} miesiące temu`;
    } else {
      fulldate = `${month_diff} miesięcy temu`;
    }
  } else if (day < today.getDate()) {
    if (day_diff == 1) {
      fulldate = "wczoraj";
    } else if (day_diff > 1 && day_diff < 7) {
      fulldate = `${day_diff} dni temu`;
    } else if (day_diff > 7 && day_diff < 14) {
      fulldate = "tydzień temu";
    } else if (day_diff > 14 && day_diff < 21) {
      fulldate = "2 tygodnie temu";
    } else if (day_diff > 21 && day_diff < 28) {
      fulldate = "3 tygodnie temu";
    } else {
      fulldate = "1 miesiąc temu";
    }
  } else {
    fulldate = "dzisiaj";
  }
  return fulldate;
}
