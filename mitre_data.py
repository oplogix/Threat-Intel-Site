import os
import json

MITRE_PATH = "data/mitre/enterprise-attack"  # Just enterprise attacks currently

# Dummy severity classification based on tactics
TACTIC_SEVERITY = {
    'initial-access': 'medium',
    'execution': 'medium',
    'persistence': 'medium',
    'privilege-escalation': 'high',
    'defense-evasion': 'high',
    'credential-access': 'high',
    'discovery': 'low',
    'lateral-movement': 'high',
    'collection': 'low',
    'exfiltration': 'high',
    'impact': 'high'
}

def load_attack_patterns():
    patterns = []
    for root, _, files in os.walk(MITRE_PATH):  # Changed to work recursively
        for filename in files:
            if filename.endswith(".json"):
                with open(os.path.join(root, filename), 'r', encoding='utf-8') as f:
                    try:
                        data = json.load(f)
                        for obj in data.get('objects', []):
                            if obj.get('type') == 'attack-pattern':
                                patterns.append(obj)
                    except Exception as e:
                        print(f"Error parsing {filename}: {e}")
    return patterns

def get_threats_for_tech(tech_name):
    patterns = load_attack_patterns()
    matched = []
    tech_name_lower = tech_name.lower()

    for pattern in patterns:
        if 'description' in pattern and tech_name_lower in pattern['description'].lower():
            # Assign severity based on tactic
            severity = 'low'  # Default severity
            for tactic in pattern.get('kill_chain_phases', []):
                phase_name = tactic.get('phase_name')
                if phase_name and phase_name in TACTIC_SEVERITY:
                    severity = TACTIC_SEVERITY.get(phase_name, 'low')
                    break

            matched.append({
                'name': pattern.get('name'),
                'description': pattern.get('description'),
                'id': pattern.get('external_references', [{}])[0].get('external_id', ''),
                'platforms': pattern.get('x_mitre_platforms', []),
                'tactics': pattern.get('kill_chain_phases', []),
                'severity': severity
            })

    return matched
