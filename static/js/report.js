$(document).ready(function () {
    let currentSeverity = 'all';
    let expanded = false; // for toggle all

    // Initial grouping
    groupByCategory();

    // Severity click handlers
    $('#low-severity').click(() => applyFilter('low'));
    $('#medium-severity').click(() => applyFilter('medium'));
    $('#high-severity').click(() => applyFilter('high'));
    $('#all-severity').click(() => applyFilter('all'));

    // Tech checkbox change handler
    $('.tech-checkbox').change(() => applyFilter(currentSeverity));

    // Expand/Collapse all button
    $('#toggle-all').click(function () {
        expanded = !expanded;

        $('.tech-content').slideToggle(200);
        $('.tech-header').each(function () {
            const base = $(this).text().replace(/^▶|▼/, '');
            $(this).text((expanded ? '▼ ' : '▶ ') + base.trim());
        });

        $(this).text(expanded ? 'Collapse All' : 'Expand All');
    });

    // Individual tech header toggle
    $('.tech-header').click(function () {
        const $content = $(this).next('.tech-content');
        $content.slideToggle(200);

        const current = $(this).text().trim();
        if (current.startsWith('▶')) {
            $(this).text(current.replace('▶', '▼'));
        } else {
            $(this).text(current.replace('▼', '▶'));
        }
    });

    function applyFilter(severity) {
        currentSeverity = severity;
        const selectedTechs = $('.tech-checkbox:checked').map(function () {
            return $(this).val();
        }).get();

        $('.threat-item').each(function () {
            const itemSeverity = $(this).data('severity');
            const itemTech = $(this).closest('.list-group').attr('id').replace('threat-list-', '');

            const matchesTech = selectedTechs.includes(itemTech);
            const matchesSeverity = severity === 'all' || itemSeverity === severity;

            if (matchesTech && matchesSeverity) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        // Hide or show full tech sections
        $('.tech-section').each(function () {
            const tech = $(this).data('tech');
            const show = selectedTechs.includes(tech);
            $(this).toggle(show);
        });

        updateFilterStatus(selectedTechs, severity);
    }

    function updateFilterStatus(techs, severity) {
        const severityMap = {
            'low': 'Low Severity',
            'medium': 'Medium Severity',
            'high': 'High Severity',
            'all': 'All Severities'
        };

        const techDisplay = techs.length === 0 ? 'No Techs' : techs.join(' + ');
        const statusText = `Showing: ${techDisplay} + ${severityMap[severity]}`;
        $('#filter-status').text(statusText);
    }

    function groupByCategory() {
        $('.list-group').each(function () {
            const $list = $(this);
            const items = $list.children('.threat-item');
            const categories = {};

            items.each(function () {
                const category = $(this).data('category');
                if (!categories[category]) categories[category] = [];
                categories[category].push($(this));
            });

            $list.empty();

            for (let category in categories) {
                $list.append($('<li class="list-group-item active">').text(category));
                categories[category].forEach(item => $list.append(item));
            }
        });
    }
});

// Toggle full threat details
$(document).on('click', '.toggle-details', function () {
    const $details = $(this).siblings('.more-details');
    $details.slideToggle(150);

    const currentText = $(this).text().trim();
    $(this).text(currentText === '🔽 More' ? '🔼 Less' : '🔽 More');
});
