using DataLyzer.JwtToken.Provider;
using DataLyzer.Models;
using DataLyzer.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DataLyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IJwtTokenHandler tokenHandler;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        public LoginController(
            IJwtTokenHandler tokenHandler,
            UserManager<User> userManager,
            SignInManager<User> signInManager
            )
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenHandler = tokenHandler;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Post([FromBody] LoginUser user) 
        {
            User appUser = await userManager.FindByEmailAsync(user.Username);
            if (appUser != null) 
            {
                Microsoft.AspNetCore.Identity.SignInResult result = await signInManager.PasswordSignInAsync(appUser, user.Password, false, false);
                if (result.Succeeded) {
                    string token = this.tokenHandler.GetToken(appUser.Email, appUser.UserName);
                    return Ok(new { token = token });
                }
               
            }
            return BadRequest();
        }

        [HttpPost("create")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateUser([FromBody]NewUser  user) 
        {
            User newUser = new User
            {
                UserName = user.UserName,
                Email = user.Email
            };

            IdentityResult identityResult = await userManager.CreateAsync(newUser, user.Password);
            return Ok(identityResult);
        }
    }
}
