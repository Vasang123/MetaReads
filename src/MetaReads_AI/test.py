from transformers import pipeline
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")

summarizer = pipeline('summarization')

article = """
    
    
Artificial Intelligence (AI) is no longer a concept confined to science fiction; it has become an integral part of the technological landscape, dramatically transforming various aspects of human life. At its core, AI refers to the simulation of human intelligence in machines designed to think, learn, and make decisions. From voice-activated virtual assistants like Siri and Alexa to complex algorithms that recommend what you should watch or buy next, AI is already woven into the fabric of modern life. Its potential to impact the future, however, stretches far beyond these everyday conveniences. As AI continues to evolve, it promises to revolutionize industries, accelerate scientific discovery, and alter the very nature of work, communication, and even how we understand human existence.

AI’s influence spans numerous fields, with remarkable advancements particularly in healthcare, education, finance, transportation, and entertainment. In healthcare, AI-driven tools have been developed to detect diseases with unprecedented accuracy. Medical imaging, for instance, has been transformed by AI algorithms that can analyze X-rays, MRIs, and other scans, diagnosing conditions such as cancer or heart disease more quickly and reliably than traditional methods. Additionally, AI-powered platforms are assisting doctors in treatment planning, providing personalized recommendations based on a patient’s medical history and genetic makeup. The ability of AI to process vast amounts of data at high speeds enables earlier diagnoses and more effective treatments, leading to better health outcomes.

Education is another area where AI is beginning to show its transformative power. The potential for personalized learning has been greatly enhanced by AI, which can tailor educational content to individual students’ needs, learning styles, and progress. AI tools are helping educators develop curricula that adapt in real-time, ensuring that students who are struggling receive extra attention, while those who excel can move ahead at their own pace. In higher education, AI-powered platforms are facilitating more immersive and interactive learning experiences, bringing new concepts to life through virtual simulations and adaptive problem-solving environments.

In the financial sector, AI is driving innovations that streamline operations and enhance decision-making. Algorithms are used to detect fraudulent transactions, assess risks, and even manage investment portfolios. Robo-advisors, for example, can provide personalized financial advice by analyzing an individual’s income, spending habits, and long-term goals. The efficiency and speed of these AI-driven tools allow banks and financial institutions to offer more customized services at a lower cost, transforming how people manage their money.

Transportation is on the cusp of a revolution due to advancements in AI, particularly in the development of autonomous vehicles. Self-driving cars are equipped with AI systems that use sensors, cameras, and data processing to navigate roads, avoid obstacles, and make split-second decisions. As these technologies become more sophisticated, they promise to reduce traffic accidents caused by human error, increase fuel efficiency, and create a more sustainable transportation system. Furthermore, AI is playing a key role in optimizing logistics and supply chain management, ensuring that goods are transported and delivered more efficiently, reducing costs for businesses and consumers alike.

AI's impact on the entertainment industry is profound as well. Streaming services like Netflix and Spotify rely on AI algorithms to recommend movies, shows, and music based on users’ past behavior. These algorithms analyze vast amounts of data to identify patterns in individual preferences, providing personalized entertainment experiences. In content creation, AI is being used to generate scripts, compose music, and even create art, pushing the boundaries of creativity. While the idea of machines creating original content might have once seemed far-fetched, AI’s ability to learn from existing works and apply that knowledge to new creations is opening up exciting possibilities for the future of art and entertainment.

Despite its many benefits, the rise of AI also presents significant challenges and concerns. One of the most pressing issues is the impact of AI on employment. As AI systems become more capable, many tasks that were once performed by humans are being automated. Jobs in manufacturing, customer service, and even fields like journalism and law are increasingly at risk of being replaced by AI-driven tools. While AI creates opportunities for new jobs in technology and data science, the transition could lead to widespread job displacement and economic inequality if not managed carefully.

The ethical implications of AI are another major concern. As AI systems are used to make decisions in critical areas such as law enforcement, hiring, and healthcare, ensuring fairness and accountability becomes crucial. AI systems, while incredibly powerful, are only as unbiased as the data they are trained on. If an AI algorithm is trained on biased data, it can perpetuate or even exacerbate social inequalities, leading to unfair outcomes in areas such as criminal justice or employment. This has sparked debates over the need for transparency in AI decision-making and the development of ethical guidelines to ensure that AI is used responsibly.

Moreover, the increasing use of AI raises questions about privacy and security. AI systems rely on vast amounts of personal data to function effectively, whether it’s tracking your online habits or monitoring your health through wearable devices. As more personal information is collected, concerns about data breaches and misuse grow. Governments and organizations must navigate the fine line between using AI for beneficial purposes and safeguarding individuals' privacy and security in the digital age.

Looking ahead, the future of AI holds both tremendous potential and significant uncertainty. As AI continues to advance, it will likely become even more integrated into our daily lives, from personalized healthcare solutions to smart cities that optimize energy use and reduce traffic congestion. The development of General AI, which would have the ability to understand and reason across a wide range of tasks just as humans do, could mark a major leap forward in the evolution of intelligent machines. However, achieving this level of AI sophistication remains a distant goal, and it is unclear how such developments might reshape society.

In conclusion, Artificial Intelligence is a double-edged sword that can bring enormous benefits but also significant risks. It is reshaping industries, economies, and our way of life in ways we are just beginning to understand. As AI continues to evolve, it is crucial for society to thoughtfully consider the implications of these technologies, ensuring that their benefits are maximized while minimizing the potential downsides. Ethical considerations, regulatory frameworks, and proactive planning will play critical roles in navigating this rapidly changing landscape. Ultimately, the future of AI depends on how we choose to develop, deploy, and regulate these powerful technologies.

Artificial Intelligence is not just a tool; it is a force that will shape the future of humanity. How we harness this force will determine whether it leads to a world of unprecedented innovation and opportunity or one fraught with inequality and uncertainty. The challenge before us is to ensure that AI remains a technology that serves all of humanity, driving progress, enhancing well-being, and fostering a more equitable world for future generations.
"""

def split_text(text, max_length):
    sentences = text.split('. ')
    chunks = []
    chunk = ""
    for sentence in sentences:
        if len(chunk) + len(sentence) <= max_length:
            chunk += sentence + ". "
        else:
            chunks.append(chunk.strip())
            chunk = sentence + ". "
    chunks.append(chunk.strip())
    return chunks

def summarize_text(text):
    max_chunk_length = 1024
    article_chunks = split_text(text, max_chunk_length)

    summaries = [summarizer(chunk, max_length=70, min_length=10, do_sample=False)[0]['summary_text'] for chunk in article_chunks]

    final_summary = " ".join(summaries)

    return final_summary


@app.route('/summarize', methods=['POST'])
def home():

    data = request.get_json()

    if 'text' not in data:
        return jsonify({'error': 'Text must be a non-empty string'}), 400

    text_summary = summarize_text(data['text'])
    return text_summary

@app.route('/test', methods=['GET'])
def test():
    return "Server is up and running!"


if __name__ == '__main__':
    app.run(debug=True)
