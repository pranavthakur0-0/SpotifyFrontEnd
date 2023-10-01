export const parserGet =  (name)=>{
    const data = JSON.parse(localStorage.getItem(`${name}`));
    return data;
}

export const Stringify= (name, value)=>{
    localStorage.setItem(`${name}`, JSON.stringify(value));
}