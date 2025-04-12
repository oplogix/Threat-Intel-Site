import feedparser
from flask import Flask, render_template, request
from mitre_data import get_threats_for_tech

app = Flask(__name__)

RSS_FEED_URL = "http://nao-sec.org/feed.xml"

def parse_rss():
    feed = feedparser.parse(RSS_FEED_URL)
    return feed.entries[:10]  # Get's 10 most recent entries

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/rss-feed')
def rss_feed():
    entries = parse_rss()
    return render_template('rss_feed.html', entries=entries)

@app.route('/report', methods=['POST'])
def report():
    selected_techs = request.form.getlist('technologies')
    all_threats = {}
    severity_counts = {'low': 0, 'medium': 0, 'high': 0}

    for tech in selected_techs:
        threats = get_threats_for_tech(tech)
        all_threats[tech] = threats

        # Count severity levels
        for threat in threats:
            severity_counts[threat['severity']] += 1

    total_threats = sum(severity_counts.values())

    return render_template('report.html', techs=selected_techs, threats=all_threats,
                           severity_counts=severity_counts, total_threats=total_threats)




if __name__ == '__main__':
    app.run(debug=True)
