import L from 'leaflet';

export type IconOptions = {
    className: string;
    icon: string;
    markerColor: string;
    iconColor: string;
    outlineColor: string;
    outlineWidth: string;
    iconSize: [number, number];
}

export type BasicOptions = {
    className: string;
    markerColor: string;
    iconColor: string;
    outlineColor: string;
    outlineWidth: string;
    iconSize: [number, number];
}

export function ExtendDefaultOptions(options: BasicOptions, iconName:string): IconOptions
{
    return {
        icon: iconName,
        className: options.className,
        markerColor: options.markerColor,
        iconColor: options.iconColor,
        outlineColor: options.outlineColor,
        outlineWidth: options.outlineWidth,
        iconSize: options.iconSize
    };
}

export function CreateIcon(optionss: IconOptions){
    const Extander = L.Icon.extend({
        options: optionss,
    
        initialize: function (options: any) {
            options = L.Util.setOptions(this, options);
        },
    
        createIcon: function () {
            var options = L.Util.setOptions(this, optionss);
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
            var backgroundCircle = document.createElementNS('http://www.w3.org/2000/svg', "circle");
            var icongroup = document.createElementNS('http://www.w3.org/2000/svg', "g");
            var icon = document.createElementNS('http://www.w3.org/2000/svg', "text");
    
            svg.setAttribute('width', options.iconSize[0]);
            svg.setAttribute('height', options.iconSize[1]);
            svg.setAttribute('viewBox', '0 0 31 42');
            svg.setAttribute('class', 'l-icon-material');
            svg.setAttribute('style', 'margin-left:-' + options.iconSize[0]/2 + 'px; margin-top:-' + options.iconSize[1] + 'px')
            svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            
            backgroundCircle.setAttribute('cx', '15.5');
            backgroundCircle.setAttribute('cy', '15');
            backgroundCircle.setAttribute('r', '11');
            backgroundCircle.setAttribute('fill', options.markerColor);
    
            path.setAttributeNS(null, "d", "M15.6,1c-7.7,0-14,6.3-14,14c0,10.5,14,26,14,26s14-15.5,14-26C29.6,7.3,23.3,1,15.6,1z");
            path.setAttribute('fill', options.markerColor);
            path.setAttribute('stroke', options.outlineColor);
            path.setAttribute('stroke-width', options.outlineWidth);
    
            icon.textContent = options.icon;
            icon.setAttribute('x', '7');
            icon.setAttribute('y', '23');
            icon.setAttribute('class', 'material-icons');
            icon.setAttribute('fill', options.iconColor);
            icon.setAttribute('font-family', 'Material Icons');
    
            svg.appendChild(path);
            svg.appendChild(backgroundCircle);
            icongroup.appendChild(icon);
    
            svg.appendChild(icongroup);
    
            svg.setAttribute('transform', "matrix(1 0 0 1 -" + options.iconSize[0] / 2 + " " + parseInt(options.iconSize[1]) + ")");
    
            return svg;
        }
    });

    return new Extander();
}