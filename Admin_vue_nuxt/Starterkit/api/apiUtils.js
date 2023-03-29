export const createFormData = (params) => {
  const formData = new FormData()
  for(let param in params){
    formData.append(param, params[param])
  }
  return formData
}
