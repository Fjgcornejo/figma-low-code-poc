import router from "../router/index";

class MainService {

  constructor(){
    this.token = JSON.parse(localStorage.getItem('JWT')).access_token
  }

  findAll (viewModel) {
    this.vapers = viewModel.vapers
    fetch(`https://lab.onesaitplatform.com/api-manager/server/api/v1/vapers/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(res => {
        if(res.ok)
          return res.json()
        else{
          throw res;
        }
      })
      .then(r => {
        viewModel.vapers = r
        this.vapers = r
      })

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
    if (!filter) {
      return this.vapers
    }
    filter = filter.toLowerCase()
    let result = this.vapers.filter(v => {
      return v.name.toLowerCase().indexOf(filter) >= 0})
    return result
  }

  create (vaper) {
    vaper.id = parseInt(vaper.id)
    console.log(JSON.stringify(vaper))
    fetch(`https://lab.onesaitplatform.com/api-manager/server/api/v1/vapers/`,
    {
      method: 'POST',
      body: JSON.stringify(vaper),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    }
    ).then(res =>{
      if(res.status===200 || res.status===204)
        return res.json()
      else
        throw res;
    })
    .then(router.push('Home.html'))
    .catch(router.push('/'))

  }

  update (vaper) {
    console.log(JSON.stringify(vaper))
    let _id = vaper._id
    delete vaper._id
    fetch(`https://lab.onesaitplatform.com/api-manager/server/api/v1/vapers/${_id}`,
    {
      method: 'PUT',
      body: JSON.stringify(vaper),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    }
    ).then(res =>{
      if(res.status===200 || res.status===204)
        return res.json()
      else
        throw res;
    })
    .then(router.push('Home.html'))
    .catch(router.push('/'))
  }

  delete (id) {
    fetch(`https://lab.onesaitplatform.com/api-manager/server/api/v1/vapers/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    }
    ).then(res =>{
      if(res.status===200 || res.status===204)
        return res.json()
      else
        throw res;
    })
    .then(router.push('Home.html'))
    .catch(router.push('/'))
  }
  }


export default new MainService
