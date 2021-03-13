const getUsers =  async (lastID=0) => {
let loadMore = lastID>0? `&since=+${lastID}` : '';

try {
    let response = await fetch(
        'https://api.github.com/users?per_page=25' + loadMore, {
         accept: 'application/vnd.github.v3+json',
        }
    );
    let json = await response.json();
    let result=[];
    json.forEach( usr => {
      result.push({
        id: usr.id,
        username: usr.login,
        avatar_url: usr.avatar_url
      })
    } );

    return result;
  } catch (error) {
    console.error('error',error);
  }
};


const getUserByUserName =  async userName => {
try {
    let response = await fetch(
        `https://api.github.com/users/${userName}`, {
         accept: 'application/vnd.github.v3+json'
        }
    );
    let json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};

const getUserRepos =  async userName => {
try {
    let response = await fetch(
        `https://api.github.com/users/${userName}/repos`, {
         accept: 'application/vnd.github.v3+json'
        }
    );
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};


export {
  getUsers,
  getUserByUserName,
  getUserRepos,
};

