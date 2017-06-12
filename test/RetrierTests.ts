import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { Retrier } from '../src/SN';
const expect = Chai.expect;

@suite('Retrier Tests')
export class RetrierTests{
        
        @test
        public async 'Simple Counter'(){
            let count = 0;
            await Retrier.Create(async () => {
                count = count + 1;
                return count === 3;
            }).Run();
            expect(count).to.be.eq(3);
        }

        @test
        public async 'onSuccess has been triggered'(){
            let triggered = false;
            await Retrier.Create(async () => true)
            .Setup({
                onSuccess: () => {
                    triggered = true;
                }
            }).Run()

            expect(triggered).to.be.eq(true);
        }

        @test
        public async 'onTimeout has been triggered'(){
            let triggered = false;
            await Retrier.Create(async () => false)
            .Setup({
                onTimeout: () => {
                    triggered = true;
                },
                timeoutMs: 1
            }).Run()

            expect(triggered).to.be.eq(true);
        }

        @test
        public async 'onTry has been triggered'(){
            let triggered = false;
            await Retrier.Create(async () => true)
                .Setup({
                    onTry: () => { 
                        triggered = true;
                    }
                })
                .Run();
            expect(triggered).to.be.eq(true);
        }     
}