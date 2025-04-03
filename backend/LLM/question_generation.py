from flask import Blueprint, request, jsonify

question_route = Blueprint('question_generation',__name__)

@question_route.route('/generate',methods=['GET'])
def generate_questions():
    text = request.get_json()
    text.get('text')
    from transformers import AutoModelForCausalLM, AutoTokenizer
    model_name = "nvidia/AceInstruct-1.5B"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype="float32", device_map="cuda")
    prompt = """"
    Generate questions based on the below resume using Skills and Projects. Only return the questions, with no other data such as "Here are the questions", etc.
    Make the questions be separated by empty lines in between
    """ + text

    messages = [{"role": "user", "content": prompt}]

    text = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )
    model_inputs = tokenizer([text], return_tensors="pt").to("cuda")

    generated_ids = model.generate(
        **model_inputs,
        max_new_tokens=4096
    )
    generated_ids = [
        output_ids[len(input_ids):] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
    ]

    response = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]
    del model 
    return response