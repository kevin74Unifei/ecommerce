package ecommerce.main.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import ecommerce.main.DTO.MealDTO;
import ecommerce.main.Entities.Meal;
import ecommerce.main.Repositories.IMealRepository;
import ecommerce.main.Services.MealService;
import ecommerce.main.Util.Constants;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.support.ServletContextResource;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Log
@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/meal")
public class MealController {

    @Autowired
    private IMealRepository _mealRepository;

    @Autowired
    private MealService _mealService;

    @Autowired
    private ServletContext _servletContext;

    @PostMapping()
    public ResponseEntity<String> save(@RequestParam("meal") String meal, @RequestParam("files")MultipartFile[] multipartFiles) {
        String response;
        try {
            ObjectMapper mapper = new ObjectMapper();
            MealDTO dto = mapper.readValue(meal, MealDTO.class);
            response = _mealService.save(dto, multipartFiles);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/image/{id}/{image}")
    @ResponseBody
    public Resource getImages(@PathVariable("id") Integer id, @PathVariable("image") String image) throws IOException {
        return new ServletContextResource(_servletContext, Constants.IMAGES_PATH + id + "/" + image);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getMealById(@PathVariable("id") Integer id){
        try{
            Optional<Meal> meal = _mealRepository.findById(id);
            if(meal.isEmpty())
                throw new Exception("Meal not found");

            return new ResponseEntity<>(meal.get(), HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping()
    public ResponseEntity<Object> getMeals() {
        try{
            List<Meal> meals = _mealRepository.findAll();
            if(meals.isEmpty())
                throw new Exception("Meals not found");

            return new ResponseEntity<>(meals, HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
