#version 450
#extension GL_ARB_separate_shader_objects : enable
#extension GL_GOOGLE_include_directive : enable

#include "../smoothing/textureBlur.glsl"

layout(constant_id = 0) const int audioSize        = 1;
layout(constant_id = 1) const float smoothingLevel = 0.f;
layout(constant_id = 2) const int width            = 1;
layout(constant_id = 3) const int height           = 1;

layout(constant_id = 4) const float amplitude = 1.f;

layout(binding = 0) uniform audioVolume {
	float lVolume;
	float rVolume;
};

layout(binding = 3) uniform sampler2D backgroundImage;

layout(location = 0) out vec4 outColor;

const vec4 color = vec4(38.45/255.0f, 40.6/255.0f, 41.2/255.0f, 1.0);

void main() {
	float volume = 0.01*max(amplitude*(lVolume+rVolume), 0.00f);

	vec2 fragTexCoord = vec2(gl_FragCoord.x/width, gl_FragCoord.y/height);
	vec4 color = blurredTexture(backgroundImage, fragTexCoord, volume);
	outColor = color;
}