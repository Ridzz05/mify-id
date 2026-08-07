<?php

namespace App\Support;

final class LandingConfiguration
{
    public static function defaults(): array
    {
        return [
            'version' => 1,
            'hero' => [
                'content' => [
                    'en' => [
                        'eyebrow' => 'Digital systems studio',
                        'headline' => 'We build the systems behind how businesses operate.',
                        'description' => 'Systemify designs, builds, and operates business software around the workflows that keep a company moving.',
                        'primaryCta' => 'Start a project',
                        'secondaryCta' => 'View selected systems',
                    ],
                    'id' => [
                        'eyebrow' => 'Studio sistem digital',
                        'headline' => 'Kami membangun sistem di balik operasional bisnis.',
                        'description' => 'Systemify merancang, membangun, dan mengoperasikan software bisnis berdasarkan alur kerja yang membuat perusahaan terus berjalan.',
                        'primaryCta' => 'Mulai proyek',
                        'secondaryCta' => 'Lihat sistem pilihan',
                    ],
                ],
                'layout' => [
                    'alignment' => 'left',
                    'verticalAlignment' => 'center',
                    'contentWidth' => 'wide',
                    'height' => 'auto',
                    'secondaryObjectPosition' => 'right',
                    'visibility' => ['desktop' => true, 'tablet' => true, 'mobile' => true],
                ],
                'highlight' => [
                    'text' => 'how businesses operate',
                    'textId' => 'operasional bisnis',
                    'style' => 'marker',
                    'width' => 'compact',
                    'shape' => 'soft',
                ],
                'secondaryObject' => [
                    'type' => 'system-status',
                    'position' => 'right',
                    'desktop' => true,
                    'tablet' => true,
                    'mobile' => true,
                ],
                'motion' => [
                    'preset' => 'editorial-reveal',
                    'intensity' => 'subtle',
                    'scrollBehavior' => 'once',
                    'duration' => 'standard',
                    'delay' => 'none',
                ],
            ],
            'cards' => ['shape' => 'half-rounded'],
            'sections' => [
                'disciplines' => [
                    'visible' => true,
                    'content' => [
                        'en' => [
                            'eyebrow' => '02 / Capabilities',
                            'title' => 'Three disciplines. One operating view.',
                            'intro' => 'The work is grouped by the job it does for your team — creating a system, removing repeated work, and keeping the result useful after launch.',
                        ],
                        'id' => [
                            'eyebrow' => '02 / Kapabilitas',
                            'title' => 'Tiga disiplin. Satu pandangan operasional.',
                            'intro' => 'Pekerjaan kami dikelompokkan berdasarkan fungsi untuk tim Anda — membuat sistem, menghilangkan pekerjaan berulang, dan menjaga hasilnya tetap berguna setelah diluncurkan.',
                        ],
                    ],
                ],
                'systems' => [
                    'visible' => true,
                    'content' => [
                        'en' => [
                            'eyebrow' => '03 / Selected systems',
                            'title' => 'Evidence, not a gallery.',
                            'intro' => 'Every project should show the problem it addressed, the system that replaced it, and the result the team can now see.',
                        ],
                        'id' => [
                            'eyebrow' => '03 / Sistem pilihan',
                            'title' => 'Bukti, bukan galeri.',
                            'intro' => 'Setiap proyek perlu menunjukkan masalah yang ditangani, sistem yang menggantikannya, dan hasil yang kini dapat dilihat tim.',
                        ],
                    ],
                ],
                'transformation' => [
                    'visible' => true,
                    'content' => [
                        'en' => ['eyebrow' => '04 / Before → after', 'title' => 'Make the operating change visible.', 'intro' => ''],
                        'id' => ['eyebrow' => '04 / Sebelum → sesudah', 'title' => 'Buat perubahan operasional terlihat.', 'intro' => ''],
                    ],
                ],
                'process' => [
                    'visible' => true,
                    'content' => [
                        'en' => ['eyebrow' => '05 / Process', 'title' => 'A technical timeline with a business starting point.', 'intro' => ''],
                        'id' => ['eyebrow' => '05 / Proses', 'title' => 'Linimasa teknis dengan titik awal dari bisnis.', 'intro' => ''],
                    ],
                ],
                'principles' => [
                    'visible' => true,
                    'content' => [
                        'en' => ['eyebrow' => '06 / Principles', 'title' => 'What we refuse to hide behind.', 'intro' => ''],
                        'id' => ['eyebrow' => '06 / Prinsip', 'title' => 'Hal yang tidak kami tutupi.', 'intro' => ''],
                    ],
                ],
                'intake' => [
                    'visible' => true,
                    'content' => [
                        'en' => [
                            'eyebrow' => '07 / Project intake',
                            'title' => 'Start with the workflow, not the wish list.',
                            'intro' => 'Tell us what is slowing the team down. We will come back with the questions, constraints, and first system shape worth discussing.',
                        ],
                        'id' => [
                            'eyebrow' => '07 / Project intake',
                            'title' => 'Mulai dari alur kerja, bukan daftar keinginan.',
                            'intro' => 'Ceritakan apa yang memperlambat tim. Kami akan kembali dengan pertanyaan, batasan, dan bentuk sistem pertama yang layak dibicarakan.',
                        ],
                    ],
                ],
            ],
        ];
    }

    public static function normalize(?array $input): array
    {
        $defaults = self::defaults();
        $source = is_array($input) ? $input : [];
        $hero = is_array($source['hero'] ?? null) ? $source['hero'] : [];
        $content = is_array($hero['content'] ?? null) ? $hero['content'] : [];
        $layout = is_array($hero['layout'] ?? null) ? $hero['layout'] : [];
        $highlight = is_array($hero['highlight'] ?? null) ? $hero['highlight'] : [];
        $secondary = is_array($hero['secondaryObject'] ?? null) ? $hero['secondaryObject'] : [];
        $motion = is_array($hero['motion'] ?? null) ? $hero['motion'] : [];
        $visibilitySource = is_array($layout['visibility'] ?? null) ? $layout['visibility'] : [];
        $responsiveValue = static function (string $device) use ($secondary, $visibilitySource): mixed {
            return array_key_exists($device, $secondary) ? $secondary[$device] : ($visibilitySource[$device] ?? null);
        };

        foreach (['en', 'id'] as $locale) {
            $localeContent = is_array($content[$locale] ?? null) ? $content[$locale] : [];
            foreach (['eyebrow', 'headline', 'description', 'primaryCta', 'secondaryCta'] as $key) {
                $defaults['hero']['content'][$locale][$key] = self::stringValue(
                    $localeContent[$key] ?? null,
                    $defaults['hero']['content'][$locale][$key],
                    $key === 'description' ? 1000 : 255,
                );
            }
        }

        $objectPosition = ($secondary['position'] ?? null) === 'top' ? 'center' : ($secondary['position'] ?? null);
        $secondaryObjectPosition = array_key_exists('secondaryObjectPosition', $layout)
            ? self::enumValue($layout['secondaryObjectPosition'], ['left', 'center', 'right'], 'right')
            : self::enumValue($objectPosition, ['left', 'center', 'right'], 'right');

        $defaults['hero']['layout'] = [
            'alignment' => self::enumValue($layout['alignment'] ?? null, ['left', 'center', 'right'], 'left'),
            'verticalAlignment' => self::enumValue($layout['verticalAlignment'] ?? null, ['start', 'center', 'end'], 'center'),
            'contentWidth' => self::enumValue($layout['contentWidth'] ?? null, ['compact', 'wide', 'full'], 'wide'),
            'height' => self::enumValue($layout['height'] ?? null, ['auto', 'tall', 'full'], 'auto'),
            'secondaryObjectPosition' => $secondaryObjectPosition,
            'visibility' => [
                'desktop' => self::boolValue($responsiveValue('desktop'), true),
                'tablet' => self::boolValue($responsiveValue('tablet'), true),
                'mobile' => self::boolValue($responsiveValue('mobile'), true),
            ],
        ];

        $defaults['hero']['highlight'] = [
            'text' => self::stringValue($highlight['text'] ?? null, 'how businesses operate', 120),
            'textId' => self::stringValue($highlight['textId'] ?? null, 'operasional bisnis', 120),
            'style' => self::enumValue($highlight['style'] ?? null, ['none', 'marker', 'underline', 'offset-block', 'signal-line'], 'marker'),
            'width' => self::enumValue($highlight['width'] ?? null, ['compact', 'balanced', 'wide'], 'compact'),
            'shape' => self::enumValue($highlight['shape'] ?? null, ['sharp', 'soft', 'half-rounded', 'full-rounded'], 'soft'),
        ];

        $defaults['hero']['secondaryObject'] = [
            'type' => 'system-status',
            'position' => $secondaryObjectPosition === 'center' ? 'top' : $secondaryObjectPosition,
            'desktop' => $defaults['hero']['layout']['visibility']['desktop'],
            'tablet' => $defaults['hero']['layout']['visibility']['tablet'],
            'mobile' => $defaults['hero']['layout']['visibility']['mobile'],
        ];

        $defaults['hero']['motion'] = [
            'preset' => self::enumValue($motion['preset'] ?? null, ['none', 'editorial-reveal', 'signal-wipe', 'system-stagger', 'evidence-reveal', 'process-progress'], 'editorial-reveal'),
            'intensity' => self::enumValue($motion['intensity'] ?? null, ['subtle', 'standard', 'expressive'], 'subtle'),
            'scrollBehavior' => self::enumValue($motion['scrollBehavior'] ?? null, ['none', 'once', 'scrub'], 'once'),
            'duration' => self::enumValue($motion['duration'] ?? null, ['quick', 'standard', 'long'], 'standard'),
            'delay' => self::enumValue($motion['delay'] ?? null, ['none', 'short', 'staggered'], 'none'),
        ];

        $cards = is_array($source['cards'] ?? null) ? $source['cards'] : [];
        $defaults['cards']['shape'] = self::enumValue($cards['shape'] ?? null, ['sharp', 'soft', 'half-rounded', 'full-rounded'], 'half-rounded');

        $sections = is_array($source['sections'] ?? null) ? $source['sections'] : [];
        foreach ($defaults['sections'] as $sectionId => $defaultSection) {
            $sourceSection = is_array($sections[$sectionId] ?? null) ? $sections[$sectionId] : [];
            $sourceSectionContent = is_array($sourceSection['content'] ?? null) ? $sourceSection['content'] : [];
            $defaults['sections'][$sectionId] = [
                'visible' => self::boolValue($sourceSection['visible'] ?? null, true),
                'content' => [],
            ];

            foreach (['en', 'id'] as $locale) {
                $localeContent = is_array($sourceSectionContent[$locale] ?? null) ? $sourceSectionContent[$locale] : [];
                $defaults['sections'][$sectionId]['content'][$locale] = [
                    'eyebrow' => self::stringValue($localeContent['eyebrow'] ?? null, $defaultSection['content'][$locale]['eyebrow'], 255),
                    'title' => self::stringValue($localeContent['title'] ?? null, $defaultSection['content'][$locale]['title'], 255),
                    'intro' => self::stringValue($localeContent['intro'] ?? null, $defaultSection['content'][$locale]['intro'], 1000),
                ];
            }
        }

        return $defaults;
    }

    private static function enumValue(mixed $value, array $allowed, string $fallback): string
    {
        return is_string($value) && in_array($value, $allowed, true) ? $value : $fallback;
    }

    private static function boolValue(mixed $value, bool $fallback): bool
    {
        return is_bool($value) ? $value : $fallback;
    }

    private static function stringValue(mixed $value, string $fallback, int $limit): string
    {
        if (!is_string($value) || trim($value) === '') {
            return $fallback;
        }

        return function_exists('mb_substr') ? mb_substr(trim($value), 0, $limit) : substr(trim($value), 0, $limit);
    }
}
