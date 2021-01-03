package ecommerce.main.Services;

import ecommerce.main.DTO.MealDTO;
import ecommerce.main.Entities.Meal;
import ecommerce.main.Repositories.IMealRepository;
import ecommerce.main.Util.Constants;
import ecommerce.main.Util.FileUpload;
import ecommerce.main.Validators.CommonValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;

@Service
public class MealService {

    @Autowired
    private IMealRepository _mealRepository;
    @Autowired
    private CommonValidator _commonValidator;

    private void validate(MealDTO mealDTO) throws Exception {
        String errors = "";

        if(_commonValidator.isStringNullOrEmpty(mealDTO.getName()))
            errors = "Name is empty; ";

        if(_commonValidator.isStringNullOrEmpty(mealDTO.getDescription()))
            errors += "Description is empty; ";

        if(_commonValidator.isNumberValid(mealDTO.getCategory()))
            errors += "Category must be greater than 0; ";

        if(_commonValidator.isMoneyValid(mealDTO.getPrice()))
            errors += "Price must be greater than 0; ";

        if(_commonValidator.isNumberValid(mealDTO.getAmount()))
            errors += "Amount must be greater than 0; ";

        if(_commonValidator.isNumberValid(mealDTO.getDaysToExpire()))
            errors += "Days to Expire must be greater than 0; ";

        if(!_commonValidator.isStringNullOrEmpty(errors))
            throw new Exception(errors);
    }

    private Meal getMealWithDTOData(MealDTO mealDTO){
        Meal meal = new Meal();

        meal.setId(mealDTO.getId());
        meal.setName(mealDTO.getName());
        meal.setDescription(mealDTO.getDescription());
        meal.setCategory(mealDTO.getCategory());
        meal.setAmount(mealDTO.getAmount());
        meal.setPrice(mealDTO.getPrice());
        meal.setDaysToExpire(mealDTO.getDaysToExpire());

        return meal;
    }

    private void saveMealWithImages(Meal meal, MultipartFile[] multipartFiles) throws IOException {
        ArrayList<String> fileNames = new ArrayList<>();
        for (MultipartFile multipartFile : multipartFiles) {
            fileNames.add(StringUtils.cleanPath(multipartFile.getOriginalFilename()));
        }

        meal.setImages(fileNames);
        Meal savedMeal = _mealRepository.save(meal);

        String uploadDir = Constants.IMPORT_IMAGE_PATH + Constants.IMAGES_PATH + savedMeal.getId();

        for(String file : fileNames){
            FileUpload.saveFile(uploadDir, file, multipartFiles[fileNames.indexOf(file)]);
        }
    }

    public String save(MealDTO mealDTO, MultipartFile[] multipartFiles) throws Exception {
        validate(mealDTO);

        Meal meal = getMealWithDTOData(mealDTO);

        saveMealWithImages(meal, multipartFiles);

        return "Meal saved successfully";
    }
}
