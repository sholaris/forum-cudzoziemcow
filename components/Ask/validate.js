export default function validate(values) {
  let errors = {};
  const empty_field_err = "Pole nie może być puste";

  for (var key in values) {
    if (values.hasOwnProperty(key)) {
      if (!values[key]) {
        errors[key] = empty_field_err;
      }
    }
  }

  return errors;
}
