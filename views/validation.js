const inputs = document.querySelectorAll("div");
const patterns = 

{
    first_name:/^[a-z]{1,8}$/,
    last_name:/^[a-z]{1,8}$/,
    email:/^[a-z]{1,15}(@)(hotmail|gmail)(.)(com)$/,
    password:/[a-zA-Z(+,.){2}]{1,15}/
}
function validate(field,regex)
{
    if(regex.test(field.value))
    {
        field.className = 'valid';
        document.getElementById(field.name).innerText = "";
        
    }
    else
    {
        field.className = 'invalid';
        document.getElementById(field.name).innerText = "invalid "+field.attributes.name.value;
        document.getElementById(field.name).style.color = "red";
    }
    
}
inputs.forEach((input)=>
{
    input.addEventListener('keyup',(e)=>
    {
        validate(e.target,patterns[e.target.attributes.name.value]);
        console.log(e.target.className);
    })
})