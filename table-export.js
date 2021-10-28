function createMDTable(rows) {
    let header = '';
    let separator = '';

    if (config.tabla.nivel.show) {
        header += '| Level '
        separator += '|-';
    }
    if (config.tabla.profundidad.show) {
        header += '| Depth '
        separator += '|-';
    }
    if (config.tabla.nombre.show) {
        header += '| Number ';
        separator += '|--------'
    }
    if (config.tabla.tipo.show) {
        header += '| Type ';
        separator += '|------';
    }
    if (config.tabla.picture.show) {
        header += '| Pic ';
        separator += '|---------';
    }
    if (config.tabla.modificador.show) {
        header += '| Modifier ';
        separator += '|-------------';
    }
    if (config.tabla.inicio.show) {
        header += '| Start ';
        separator += '|--------';
    }
    if (config.tabla.longitud.show) {
        header += '| Length ';
        separator += '|----------';
    }
    if (config.tabla.fin.show) {
        header += '| End ';
        separator += '|-----';
    }

    if (header) header += '|\r\n';
    if (separator) separator += '|\r\n';

    const lines = rows.map(row => {
        let line = '';
        if (config.tabla.nivel.show) line += `${exists(row.level)}|`;
        if (config.tabla.profundidad.show) line += `${exists(row.depth)}|`;
        if (config.tabla.nombre.show) line += `${exists(row.name)}|`;
        if (config.tabla.tipo.show) line += `${exists(row.type)}|`;
        if (config.tabla.picture.show) line += `${exists(row.pic)}|`;
        if (config.tabla.modificador.show) line += `${exists(row.usage)}|`;
        if (config.tabla.inicio.show) line += `${exists(row.start)}|`;
        if (config.tabla.longitud.show) line += `${exists(row.length)}|`;
        if (config.tabla.fin.show) line += `${exists(row.end)}|`;
        if (line) line += '\r\n';
        return line;
    });

    const table = header + separator + lines.join('');
    return table;
}

function createCSVTable(rows) {
    let header = '';
    if (config.tabla.nivel.show) header += 'Level;';
    if (config.tabla.profundidad.show) header += `Depth;`;
    if (config.tabla.nombre.show) header += `Number;`;
    if (config.tabla.tipo.show) header += `Type;`;
    if (config.tabla.picture.show) header += `Pic;`;
    if (config.tabla.modificador.show) header += `Modifier;`;
    if (config.tabla.inicio.show) header += `Start;`;
    if (config.tabla.longitud.show) header += `Length;`;
    if (config.tabla.fin.show) header += `End;`;
    if (header) header += '\r\n';

    let lines = rows.map(row => {
        let line = '';
        if (config.tabla.nivel.show) line += `${exists(row.level)};`;
        if (config.tabla.profundidad.show) line += `${exists(row.depth)};`;
        if (config.tabla.nombre.show) line += `${exists(row.name)};`;
        if (config.tabla.tipo.show) line += `${exists(row.type)};`;
        if (config.tabla.picture.show) line += `${exists(row.pic)};`;
        if (config.tabla.modificador.show) line += `${exists(row.usage)};`;
        if (config.tabla.inicio.show) line += `${exists(row.start)};`;
        if (config.tabla.longitud.show) line += `${exists(row.length)};`;
        if (config.tabla.fin.show) line += `${exists(row.end)};`;
        if (line) line += '\r\n';
        return line;
    });

    const table = header + lines.join('');
    return table;
}

function createHTMLTable(table) {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Copy</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.min.js"
        integrity="sha384-nsg8ua9HAw1y0W1btsyWgBklPnCUAFLuTMS2G72MMONqmOymq585AcH49TLBQObG"
        crossorigin="anonymous"></script>
        <style>
        .button:hover{
            cursor: pointer;
            overflow: visible;
            color: darkgreen;
          }
        </style>
    </head>
    <body>
        <div class="container-fluid col-md-10">  
        ${table}
        </div>
    </body>
    </html>`;

    return html;
}

function exists(property) {
    property == undefined ? property = '' : property;
    return property;
}

function normalizedCopy(rows) {
    let insideOccurs = [];
    const lines = rows.map(row => {
        let show = true;
        if (row.insideOccurs) {
            if (insideOccurs.filter((x) => (x == row.name)).length > 0) {
                show = false;
            } else {
                insideOccurs.push(row.name);
            }
        }

        let line = '';
        for (let i = 1; i < row.depth; i++) line += '   ';
        line += `${row.level} ${row.name}`;
        if (row.pic) {
            const len = 24 - line.length;
            for (let i = 0; i < len; i++) {
                line += ' ';
            }
            line += ` PIC ${row.pic}`;
        }
        row.usage ? line += ` ${row.usage}` : false;
        row.occurs > 0 ? line += ` OCCURS ${row.occurs} TIMES` : false;
        if (row.value) {
            if (row.value.length > 0) {
                const len = 24 - line.length;
                for (let i = 0; i < len; i++) {
                    line += ' ';
                }
                row.value.length > 1 ? line += ' VALUES' : line += ' VALUE';
                row.value.forEach(value => {
                    line += ' ' + value;
                });
            }
        }

        line.charAt(line.length - 1) == '.' ? false : line += '.';
        line += '\r\n';

        if (show) return line;
    });

    return lines.join('');
};