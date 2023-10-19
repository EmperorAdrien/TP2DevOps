from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import openai

# set your OpenAI API key
openai.api_key = "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"

@csrf_exempt
def get_bot_response(request):
    if request.method == "POST":
        user_message = json.loads(request.body.decode("utf-8")).get("user_message")

        prompt = f"{user_message}\n? Answer as Andrew Tate. (less than 150 tokens)"
        completions = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=100,
            n=1,
            stop=None,
            temperature=1,
        )

        if completions.choices[0].text:
            bot_response = completions.choices[0].text.strip()
            return JsonResponse({"bot_response": bot_response})
        else:
            return JsonResponse({"error": "Error fetching response from OpenAI API."}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method."}, status=400)