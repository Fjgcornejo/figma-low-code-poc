import router from "../router/index";

class MainService {

  constructor () {
    this.vapers = []
  }

  findAll (viewModel) {
    fetch(`https://lab.onesaitplatform.com/api-manager/server/api/v1/vapers/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('JWT')).access_token}`
        }
      })
      .then(res => {
        if(res.ok)
          return res.json()
        else{
          throw res;
        }
      })
      .then(r => viewModel.vapers = r)

    }



  login (username,password){
    const BASIC_AUTH = btoa('onesaitplatform:onesaitplatform');
    const body = new URLSearchParams({
        username,
        password,
        grant_type: 'password',
        scope: 'openid'
      })
    fetch(`https://lab.onesaitplatform.com/oauth-server/oauth/token`,
      {
        method: 'post',
        body: body,
        headers :{
           'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
           'Authorization' : `Basic ${BASIC_AUTH}`
          }
      } )
      .then(res => {
        if(res.ok)
          return res.json()
        else
          return res.json().then(e => {throw e;})
          //res.json().then(r => )
      })
      .then(r =>{
        localStorage.setItem('JWT', JSON.stringify(r))
        router.push('Home.html')
      })
      .catch(e => {
        router.push('/')
        console.log(e)
      })
  }

  findByFilter (filter) {
    console.debug('findByFilter', filter)
    if (!filter) {
      return this.vapers
    }
    filter = filter.toLowerCase()
    let result = this.vapers.filter(v => {
      return v.name.toLowerCase().indexOf(filter) >= 0
    })
    console.debug('ee', result)
    return result
  }

  create (name, details) {
    this.vapers.push({
      id: this.vapers.length,
      name: name,
      details: details,
      isDone: false
    })
  }

  update (id, name, details) {
    let todo = this.vapers.find(t => t.id === id)
    if (todo) {
      todo.name = name
      todo.details = details
    }
  }

  delete (id) {
    this.vapers = this.vapers.filter(t => t.id !== id)
  }

}
export default new MainService
