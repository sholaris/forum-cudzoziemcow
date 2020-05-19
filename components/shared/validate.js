export default function validate(values) {
  let errors = {};
  const empty_filed_err = "Pole nie może być puste";
  const wrong_email_err = "Podano niepoprawny adres email";
  const short_pass_err = "Hasło musi składać się z conajmniej 5 znaków";

  if (!validate_email(values.email)) errors.email = wrong_email_err;
  if (!validate_pass(values.password)) errors.password = short_pass_err;
  if (!values.email) errors.email = empty_filed_err;
  if (!values.password) errors.password = empty_filed_err;
  if (!values.username) errors.username = empty_filed_err;

  return errors;
}

function validate_email(email) {
  var reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (reg.test(email) == false) return false;
  return true;
}

function validate_pass(pass) {
  if (pass.length < 5) return false;
  return true;
}
