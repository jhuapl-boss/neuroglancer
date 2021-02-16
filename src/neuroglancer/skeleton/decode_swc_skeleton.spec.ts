import {SkeletonChunk} from 'neuroglancer/skeleton/backend';
import {decodeSwcSkeletonChunk} from 'neuroglancer/skeleton/decode_swc_skeleton';

const swcStr = '# Generated by NeuTu (https://github.com/janelia-flyem/NeuTu)\n\
# http://emdata1:7000/api/node/d5053e99753848e599a641925aa2d38f/bodies1104_skeletons/key/229802_swc\n\
1 0 4145 3191 3575 2 -1\n\
2 0 4149 3195 3579 3.65685 1\n\
3 0 4157 3195 3583 6.94427 2\n\
4 0 4161 3195 3591 3.65685 3\n\
5 0 4165 3199 3595 2 4\n';

describe('skeleton/decode_swc_skeleton', () => {
  it('decodes simple line skeleton', () => {
    let chunk = new SkeletonChunk();
    decodeSwcSkeletonChunk(chunk, swcStr);

    expect(chunk.vertexPositions).toEqual(new Float32Array([
      4145, 3191, 3575, 4149, 3195, 3579, 4157, 3195, 3583, 4161, 3195, 3591, 4165, 3199, 3595
    ]));  // vertex locations
    expect(chunk.indices).toEqual(new Uint32Array([
      1, 0, 2, 1, 3, 2, 4, 3
    ]));  // pairs of indices for each line
  });
  it('fails parsing improper skeleton', () => {
    let chunk = new SkeletonChunk();
    const improperSwc = '# test poorly-formatted swc data 1 2 3 4 5 6';
    expect(function() {
      decodeSwcSkeletonChunk(chunk, improperSwc);
    }).toThrow();
  });
});
