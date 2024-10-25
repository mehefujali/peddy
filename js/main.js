const lodePetCategories = async () => {
      const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
      const json = await res.json()
      displayPetCategories(json.categories)

}
const lodePet = async () => {
      const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
      const json = await res.json()
      displayPets(json.pets)
      let sortByPrice = json.pets.sort(function (small, big) {
            return big.price - small.price
      });


      const shortPriceBtn = document.getElementById("short-price-btn")
      shortPriceBtn.addEventListener("click", () => {

            displayPets(sortByPrice)
            activeBtnClass()

      })

}
const lodeCategoriesPet = async (category) => {
      const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      const json = await res.json()
      const activeBtn = document.getElementById(`activeBtn${category}`)
      activeBtnClass(activeBtn)
      displayPets(json.data)






}
const activeBtnClass = (activeBtn) => {
      const categoriesBtn = document.getElementsByClassName("category-btns")
      for (const catbtn of categoriesBtn) {
            catbtn.classList.remove('border-[#0E7A81]', 'rounded-full')
      }
      activeBtn.classList.add('border-[#0E7A81]', 'rounded-full')

}

lodePet()
lodePetCategories()

// pet categories btn display  

const displayPetCategories = (data) => {
      const categoriesCont = document.getElementById("categories-cont")

      data.map(cate => {
            const { category } = cate
            const btnDiv = document.createElement("div")
            btnDiv.classList = "w-full"
            // btnDiv.onclick("lodeCategoriesPet(cate.category)")
            btnDiv.innerHTML = `
            <div id="activeBtn${category}" onclick="lodeCategoriesPet('${category}')" class="flex btn-sm items-center text-xm border-gray-300 md:border-2 justify-cnter md:h-16 bg-white lg:h-20  md:text-lg btn flex-grow flex-nowrap category-btns w-full">
            <img class=" w-3 md:w-8 lg:w-12  " src="${cate.category_icon}">
             <h1 class=" md:font-bold md:text-xl">${cate.category}</h1>
            </div>
            `
            categoriesCont.appendChild(btnDiv)
      });
}
const lodeLikedPet = async (event, id) => {


      const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
      const json = await res.json()
      displayLikedPet(event, json.petData);
}
const lodePetDetails = async (id) => {
      const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
      const json = await res.json()

      sowPetDetels(json.petData);
}

const displayPets = (data) => {

      const petConte = document.getElementById("pet-cont")
      petConte.innerHTML = ``





      if (data.length === 0) {
            petConte.classList.remove("grid")
            petConte.classList.add("bg-gray-100")
            petConte.innerHTML = `
            <div class=" w-6/12 mx-auto pt-10 text-center h-full  flex items-center justify-center flex-col ">
              <img class=" w-20 md:w-fit" src="../assets/images/error.webp">
              <h1 class=" text-center font-bold text-2xl md:text-3xl xl:text-4xl">No Information Available</h1>
              <p class=" text-sm lg:text-lg">Begin your journey toward finding the perfect match for your family through adoption.
                Discover support, guidance, and resources to help you every step of the way.
                    Your new beginning starts here.</p>
            </div>
            
            `
            return
      }
      else {
            petConte.classList.add("grid")
            petConte.classList.remove("bg-gray-100")
      }

      data.map(pet => {
            const { pet_name, breed, date_of_birth, price, image, category, gender, petId } = pet
            const petCard = document.createElement('div')
            petCard.classList = "p-5 rounded-lg border border-gray-200"
            petCard.innerHTML = `
             <div>
                  <div>
                        <image class=" w-full rounded-lg" src="${image}">
                  </div>
                  <div class=" flex flex-col gap-2 mt-6 mb-6">
                        <h2 class=" text-2xl font-bold" >${pet_name}</h2>
                        <p><i class="fa-solid fa-border-all"></i> Breed: ${breed ? breed : "Not available"} </P>
                        <p><i class="fa-regular fa-calendar-days"></i> Birth: ${date_of_birth ? date_of_birth : "Not available"} </P>
                        <p><i class="fa-solid fa-mercury"></i> Gender: ${gender ? gender : "Not available"} </P>
                        <p><i class="fa-solid fa-dollar-sign"></i> Price: ${price ? price : "Not available"} </P>
                  </div>
                  <div class=" mb-4 border-b border-gray-200"></div>
                  <div class=" flex justify-between gap-4 ">
                   <button value="like-btn"   onclick="lodeLikedPet(event ,${petId})" class="btn btn-sm bg-white border-[#0E7A81] text-[#0E7A81] font-semibold flex-grow"><i class="fa-regular fa-thumbs-up" value="icon"></i></button>
                   <button onclick="adoptModalSow(event)"  class="btn btn-sm bg-white border-[#0E7A81] text-[#0E7A81] font-semibold flex-grow">Adopt</button>
                   <button class="btn btn-sm bg-white border-[#0E7A81] text-[#0E7A81] font-semibold  flex-grow" onclick="lodePetDetails('${petId}')">Details</button>
                  </div>

             </div>
            `
            const loder = document.getElementById("loder")
            loder.classList.remove("hidden")
            setTimeout(() => {
                  loder.classList.add("hidden")
                  petConte.appendChild(petCard)

            }, 2000)


      })

}


const adoptModalSow = (event) => {
      adaptModal.showModal()
      const adoptBtn = event.target
      console.log(adoptBtn.innerText);
      const adoptCount = document.getElementById("adoptCount")
      let adoptCountInt = parseInt(adoptCount.innerText)
      const adoptCoun = setInterval(() => {
            adoptCount.innerText = adoptCountInt--
      }, 500);
      setTimeout(() => {

            adaptModal.close()



      }, 2300);
      setTimeout(() => {
            clearInterval(adoptCoun)
            adoptCount.innerText = "3"
            adoptBtn.setAttribute("disabled", true);
            adoptBtn.innerText = "Adopted"


      }, 2400)


}

let likedPet = []

const displayLikedPet = (event, data) => {
      const likedPetcont = document.getElementById("liked-pet-cont")
      likedPetcont.innerHTML = ``
      activeLikeBtn(event)

      likedPet.push(data)
      likedPet.map(pet => {
            const div = document.createElement("div")
            div.innerHTML = `
            <img  class=" rounded-md w-full h-full" src="${pet.image}" >
            `
            likedPetcont.appendChild(div)


      })



}

const activeLikeBtn = (event) => {
      const icon = event.target.attributes.value.value
      if (icon === "icon") {
            event.target.parentNode.classList.remove("bg-white")
            event.target.parentNode.classList.remove("text-[#0E7A81]")
            event.target.parentNode.classList.add("bg-[#0E7A81]", "text-white", "hover:bg-[#0E7A81]")

      }
      else {
            event.target.classList.remove("bg-white")
            event.target.classList.remove("text-[#0E7A81]")
            event.target.classList.add("bg-[#0E7A81]", "text-white", "hover:bg-[#0E7A81]")
      }
}

const sowPetDetels = (data) => {


      const { pet_name, breed, date_of_birth, price, image, category, gender, petId, pet_details, vaccinated_status } = data
      console.log(pet_name);
      const modalDiv = document.getElementById("modalDiv")
      modalDiv.innerHTML = `
       <div class="modal-box">
                              <img class=" rounded-lg w-full" src="${image}">
                               <h2 class=" text-2xl font-bold mt-4" >${pet_name}</h2>
                              
                              <div class="  mt-6 mb-6 grid grid-cols-2 gap-2">
                       
                        <p><i class="fa-solid fa-border-all"></i> Breed: ${breed ? breed : "Not available"} </P>
                        <p><i class="fa-regular fa-calendar-days"></i> Birth: ${date_of_birth ? date_of_birth : "Not available"} </P>
                        <p class=" text-nowrap"><i class="fa-solid fa-mercury"></i> Gender: ${gender ? gender : "Not available"} </P>
                        <p><i class="fa-solid fa-dollar-sign"></i> Price:  ${price ? price : "Not available"} </P>
                        <p class=" text-nowrap"><i class="fa-solid fa-mercury"></i> Vaccinated status: ${vaccinated_status ? vaccinated_status : "Not available"} </P>
                                 </div>
                                 <div class=" mb-4 border-b border-gray-200"></div>
                                 <h3 class=" font-semibold text-lg">Details Information</h3>
                              <p class="py-4">${pet_details ? pet_details : "Not available"}</p>
                              <div class="modal-action">
                                    <form method="dialog">
                                          <button class="btn w-full border border-[#0E7A81] text-[#0E7A81]">Close</button>
                                    </form>
                              </div>
                        </div>
      `


      detailsModal.showModal()
}

const categoryBetns = document.getElementsByClassName("category-btns")

for (const btn of categoryBetns) {
      btn.addEventListener("click", () => {
            console.log("click");
      })
}
