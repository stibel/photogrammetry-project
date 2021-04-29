export class FieldParametersService {

    static round(val, radix = 3) {
        return Math.round(val * Math.pow(10, radix)) / Math.pow(10, radix);
    }

    static getFlightHeight(GSD, camera, avgHeight) {
        //GSD to centimeters
        const height = (GSD / 100) * (camera.focalLength * Math.pow(10, -3)) / (camera.pixel * Math.pow(10, -6)) + avgHeight;
        console.log(height);
        return this.round(height, 3);
    }

    static getBase(GSD, camera, p, q, Dx, Dy) {
        const dimensionX = camera.matrixDimension[1];
        const dimensionY = camera.matrixDimension[0];

        //GSD to centimeters
        const Lx = this.round(dimensionX * (GSD / 100));
        const Ly = this.round(dimensionY * (GSD / 100));
        const Bx = this.round(Lx * (100 - p) / 100);
        const By = this.round(Ly * (100 - q) / 100);
        const Nx = Math.ceil((Dx * 1000 / Bx) + 4);
        const Ny = Math.ceil(Dy * 1000 / By);
        const photoQuantity = Nx * Ny;

        return { Lx, Ly, Bx, By, Nx, Ny, photoQuantity };
    }

    static correctBase(Nx, Ny, Dx, Dy) {
        //Dx, Dy to meters
        const Bx = this.round(Dx * 1000 / (Nx - 4))
        const By = this.round(Dy * 1000 / Ny);

        return { Bx, By };
    }

    static getInterval(Bx, plane, camera) {
        //checking if time between expositions is longer than camera work cycle
        const tFirst = Bx / plane.vMax;
        const tSecond = Bx / plane.vMin;
        const isMaxOk = camera.workCycle < tFirst;
        const isMinOk = camera.workCycle < tSecond;
        return{ isMaxOk, isMinOk };
    }

}
