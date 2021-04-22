export class FieldParametersService {
    static getFlightHeight(GSD, camera, avgHeight) {
        const height = GSD * (camera.focalLength * Math.pow(10, -3)) / (camera.pixel * Math.pow(10, -6)) + avgHeight;
        console.log(height);
        return Math.round(height * 1000) / 1000;
    }

    static getBase(GSD, camera, p, q) {
        const dimensionX = camera.matrixDimension[1];
        const dimensionY = camera.matrixDimension[0];

        const Lx = dimensionX * GSD;
        const Ly = dimensionY * GSD;
        const Bx = Lx * (100 - p) / 100;
        const By = Ly * (100 - q) / 100;

        return {Lx, Ly, Bx, By};
    }

}
