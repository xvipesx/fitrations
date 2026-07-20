
# Total Daily Energy Expenditure Multipliers (TDEE values)
tdee_multipliers = {
    "sedentary":  1.2,
    "lightly_active": 1.375,
    "moderately_active": 1.55,
    "very_active": 1.725,
    "super_active": 1.9,
    }

# BMR forumlas found use kg and cm explicitly, so I needed a way to convert them before computing
def pounds_to_kg(pounds):
    return pounds * 0.45359237

def inches_to_cm(inches):
    return inches * 2.54

def calculate_bmr_imperial(weight, height, age, sex):
    corrected_weight = pounds_to_kg(weight)
    corrected_height = inches_to_cm(height)
    if sex == 'Male':
        bmr = (10 * corrected_weight) + (6.25 * corrected_height) - (5 * age) + 5
    elif sex == 'Female':
        bmr = (10 * corrected_weight) + (6.25 * corrected_height) - (5 * age) - 161
    else:
        bmr = 0
        print('Incorrect sex given.')
    return round(bmr, 0)

def calculate_bmr_metric(weight, height, age, sex):
    if sex == 'Male':
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5
    elif sex == 'Female':
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161
    else:
        bmr = 0
        print('Incorrect sex given.')
    return round(bmr, 0)

def include_multiplier(bmr, activity):
    # Pull the value from the associated key in the TDEE multipliers
    result = tdee_multipliers.get(activity)
    tdee_value = bmr * result
    return round(tdee_value, 0)

def calc_tdee(data):
    if data.measurement == 'imperial':
        bmr = calculate_bmr_imperial(data.weight, data.height, data.age, data.sex)
        tdee = include_multiplier(bmr, data.activity)
        result = {
            "bmr_value": bmr,
            "tdee_value": tdee,
        }
        return result
    if data.measurement == 'metric':
        bmr = calculate_bmr_metric(data.weight, data.height, data.age, data.sex)
        tdee = include_multiplier(bmr, data.activity)
        result = {
            "bmr_value": bmr,
            "tdee_value": tdee,
        }
        return result
    else:
        bmr = 0
        print('Incorrect sex given.')

