
# Total Daily Energy Expenditure Multipliers (TDEE values)

sedentary = 1.2
lightly_active = 1.375
moderately_active = 1.55
very_active	= 1.725
super_active = 1.9

# BMR forumlas found use kg and cm explicitly.

def pounds_to_kg(pounds):
    return pounds * 0.45359237

def inches_to_cm(inches):
    return inches * 2.54

def calc_bmr(data):
    corrected_weight = pounds_to_kg(data.weight)
    corrected_height = inches_to_cm(data.height)
    corrected_age = data.age
    if data.sex == 'Male':
        BMR = (10 * corrected_weight) + (6.25 * corrected_height) - (5 * corrected_age) + 5
    elif data.sex == 'Female':
        BMR = (10 * corrected_weight) + (6.25 * corrected_height) - (5 * corrected_age) - 161
    else:
        BMR = 0
        print('Incorrect sex given.')
    return BMR



